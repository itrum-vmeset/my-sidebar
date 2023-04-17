import React, { useEffect } from 'react';
import { MyModalProps } from './MyModal.props';
import classNames from "classnames";
import styles from './MyModal.module.css'

const MyModal = ({children, modalVisible, setModalVisible}: MyModalProps): JSX.Element => {

    useEffect(() => {
        const close = (e: any) => {
          if(e.keyCode === 27){
            setModalVisible(false)
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    return (
        <div className={classNames(styles.myModal, {
            [styles.active]: modalVisible === true,
        })}>
            <div className={styles.myModalContent}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;
