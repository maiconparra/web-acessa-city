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
        let isAdmin = false
        if (user) {
            user.getIdTokenResult().then((result) => {
                isAdmin = result.claims.admin
                setValues({
                    ...values,
                    admin: isAdmin
                })
            })
        } else {
            // No user is signed in.
        }       

        console.log(isAdmin)
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
                <h1>ADMIN</h1>
            }
            
            {
            prefeituras.prefeituras.map(prefeitura => (
                <h3>{prefeitura.name}</h3>
            ))
            }
        </div>
    )
}

export default MeuExemplo;