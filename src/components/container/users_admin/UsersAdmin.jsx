import React, {useEffect} from 'react'

const UsersAdmin = ({setSelectedIndex}) => {

    useEffect(() => {
        setSelectedIndex(3)
      }) 

    return (
        <div>
            Users Admin
        </div>
    )
}

export default UsersAdmin
