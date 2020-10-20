import React from 'react'
import {useSelector} from 'react-redux'
import {RootReducerType} from "../redux/rootReducer";


const Alert: React.FC = () => {
    const alerts = useSelector((state: RootReducerType) => state.alert)
    if(alerts.length > 0){
        return <div>
            {alerts.map(alert => <div key={alert.id} className={`alert alert-${alert.type}`}>
            {alert.msg}
        </div>)}
        </div>
    }

    return null
}



export default Alert
