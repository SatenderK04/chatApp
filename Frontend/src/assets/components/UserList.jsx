import React from "react";
import styles from "../CSS/UserList.module.css";

// const People = [];
const UserList = ({ usersList }) => {
  return (
    <div className={styles.userListContainer}>
      <span>Joined Users</span>
      {/* <span className={styles.room}></span> */}
      <div className={styles.joinedUser}>
        <ul>
          {usersList && usersList.length > 0 ? (
            usersList.map((user, index) => <li key={index}>{user.username}</li>)
          ) : (
            <li>No users yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
