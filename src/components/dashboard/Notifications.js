import React from 'react';
import moment from 'moment';

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-action grey lighten-4">
          <span className="card-title">Notifications</span>
        </div>
        <div className="card-content">
          <ul className='notifications'>
            { notifications && notifications.map(noti => {
                return (
                  <li key={noti.id}>
                    <span className="pink-text">{noti.user} </span>
                    <span>{noti.content}</span>
                    <div className="grey-text note-date">
                      {moment(noti.time.toDate()).fromNow()}
                    </div>
                    <br/>
                  </li>
                )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications;