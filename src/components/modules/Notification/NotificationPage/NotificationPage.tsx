import React from 'react'
import NotificationEmptyPage from '../NotificationEmptyPage/NotificationEmptyPage'
import NotificationItem, { NotificationItemProps } from '../NotificationItem/NotificationItem'
import s from './NotificationPage.module.scss'

interface NotificationPageProps {
    isEmpty?: boolean,
    data?: NotificationItemProps[],
}
const NOTIFICATION_DATA = [
    {
        ID: "ID33455",
        title: "Your order ID33455",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        checked: false,
    },
    {
        ID: "ID33456",
        title: "Your order ID33456",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        checked: false,
    },
    {
        ID: "ID33457",
        title: "Your order ID33457",
        content: "The order has been deliveried successfully!",
        date: "2 days ago",
        checked: true,
    }
]


const NotificationPage = ({ isEmpty=false, data = NOTIFICATION_DATA }: NotificationPageProps) => {
    return (
        <div className={s.notificationPage}>
        {
        isEmpty ? 
        <NotificationEmptyPage /> 
        :
        <>
            {
                data.map(item => {
                    return (
                        <NotificationItem key={`${item.ID}-${item.title}`} title={item.title} content={item.content} date={item.date} checked={item.checked}/>
                    )
                })
            }
        </>
        }
        </div>
    )
}

export default NotificationPage