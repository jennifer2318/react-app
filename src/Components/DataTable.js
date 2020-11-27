import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Input from "./Input";

class DataTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFilter: '',
            isTopSort: false,
            usersFilter: [],
            isFiltered: false,
            username: ''
        }
    }

    sortByKey = (arr, key, isTop=true) => {
        console.log(key, isTop)
        if (isTop) {
            return arr.sort(
                (a, b) => {
                    if (isNaN(a[key]) || isNaN(b[key])) return a[key] > b[key] ? 1 : -1
                    return Number(a[key]) > Number(b[key]) ? 1 : -1
                }
            )
        }
        return arr.sort(
            (a, b) => {
                if (isNaN(a[key]) || isNaN(b[key])) return a[key] < b[key] ? 1 : -1
                return Number(a[key]) < Number(b[key]) ? 1 : -1
            }
        )
    }

    filterHandleClick = e => {
        e.preventDefault()
        const {target} = e;
        const {currentFilter, isTopSort, isFiltered} = this.state;

        const name = target.attributes.getNamedItem('name').value;
        if (currentFilter === name) {
            this.setState({
                isTopSort: !isTopSort
            })
            this.sortByKey(isFiltered ? this.state.usersFilter : this.props.data, currentFilter, isTopSort)
        }else {
            this.setState({
                currentFilter: name,
                isTopSort: false
            })
            this.sortByKey( isFiltered ? this.state.usersFilter : this.props.data , name, true)
        }
    }

    renderTableHeader = () => {
        const {data} = this.props;
        const {currentFilter, isTopSort} = this.state;
        const keys = Object.keys(data[0]);

        return keys.map( (v, k) => {
            return (
                <th onClick={this.filterHandleClick} name={v} className={classNames(v, 'header-field', currentFilter === v ? isTopSort === true ? 'active-top' : 'active-down' : '')} key={k}>{v}</th>
            )
        })
    }

    renderRows = (data) => {
        return data.map( (v, k) => {
            return (
                <tr className='data-row' key={k}>
                    {
                        Object.values(v).map((dataValue, dataKey) => {
                           return <td key={dataKey}>{typeof dataValue === 'boolean' ? <input type='checkbox' readOnly checked={dataValue}/> : dataValue}</td>
                        })
                    }
                </tr>
            )
        })
    }

    changeHandler = obj => {
        const {currentFilter} = this.state;

        if (obj.valid) {
            const filteredItems = this.props.data.filter(p => p.username.startsWith(obj.value));
            console.log(filteredItems)
            const isFiltered = !filteredItems.length <= 0;
            this.setState({
                usersFilter: filteredItems,
                isFiltered: isFiltered,
                username: obj.value
            })

            this.sortByKey(this.state.usersFilter, currentFilter, true)
        }else {
            this.setState({
                usersFilter: [],
                isFiltered: false,
                username: ''
            })

            this.sortByKey(this.props.data, currentFilter, true)
        }
    }

    render() {
        const {data} = this.props;

        if (data.length <= 0) return null

        const {usersFilter, username} = this.state;

        return (
           <div>
               <Input label='Фильт по имени пользователя' validType='username' className='filter-field' placeholder='Введите имя пользователя' name='userFilter' value={this.state.username} onChange={this.changeHandler} />
               <table className={classNames('data-table', this.props.filterable ? 'filterable' : '')}>
                   <thead className='data-table-header'>
                   <tr>
                       {
                           this.renderTableHeader()
                       }
                   </tr>
                   </thead>
                   <tbody>
                   {
                       username ? this.renderRows(usersFilter) : this.renderRows(data)
                   }
                   </tbody>
               </table>
           </div>
        );
    }
}

DataTable.propTypes = {
    filterable: PropTypes.bool,
    data: PropTypes.array.isRequired,
};

export default DataTable;
