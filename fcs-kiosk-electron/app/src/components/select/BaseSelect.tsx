import './BaseSelect.scss'

import React, { Fragment } from 'react'
import Select, { components } from 'react-select'

const selectStyles = {
  option: (provided: any) => ({
    ...provided,
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    border: 'none',
    display: 'flex',
  }),
  indicatorSeparator: () => ({
    opacity: 0,
  }),
}

const menuStyle = {}

export default function BaseSelect({ options, onChange, ...otherProps }) {
  const Menu = (props) => (
    <Fragment>
      <components.Menu {...props}>{props.children}</components.Menu>
    </Fragment>
  )
  return (
    <Select
      classNamePrefix="react-select"
      defaultValue={options[2]}
      styles={selectStyles}
      options={options}
      onChange={onChange}
      components={{ Menu }}
      {...otherProps}
    />
  )
}
