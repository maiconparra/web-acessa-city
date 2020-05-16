import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TextField
} from '@material-ui/core';

import firebase from 'firebase/app'
import API from '../../utils/API'
import { useState } from 'react';


const MeuExemplo = props => {

    function onChange(user) {
        console.log(1)
        console.log(user)
        let isAdmin = false
        let teste = ''
        if (user) {
            user.getIdTokenResult().then((result) => {
                // console.log(result);
                isAdmin = result.claims.admin
                teste = result.claims.app_user_id
                setValues({
                    ...values,
                    admin: isAdmin,
                    userId: teste
                })
            })
        } else {
            // No user is signed in.
        }       
    }    

    React.useEffect(() => {        
        // listen for auth state changes
        CarregarPrefeituras();
        const unsubscribe = firebase.auth().onAuthStateChanged(onChange)
        console.log(3)
        // unsubscribe to the listener when unmounting
        return () => unsubscribe()
        }, [])

    React.useEffect(() => {
        CarregarPrefeituras();        
    }, [])

    const [values, setValues] = useState({
        admin: false,
        userId: ''
    });

    const [prefeituras, setPrefeituras] = useState({
        prefeituras: []
    })


    async function CarregarPrefeituras() {
        let prefeituras = await API.get('/city-hall');
        prefeituras = prefeituras.data;        

        setPrefeituras({
            ...prefeituras,
            prefeituras: prefeituras
        })        
    }

    return (
        <div>
            {values.admin &&
            <div>

                <h1>ADMIN</h1>                
                </div>
            }
            
            {
            <div>
            <h1>{values.userId}</h1>
            {/* prefeituras.prefeituras.map(prefeitura => (
                <h3>{prefeitura.name}</h3>
            )) */}
            </div>
            }
        </div>
    )
}

export default MeuExemplo;