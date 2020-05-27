import React, {useState, useEffect} from 'react'
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
  } from '@material-ui/core';
import firebase from 'firebase/app'


const ChangePassword = props => {


    const [password, setPassword] = useState({
        password: '',
        confirmPassword: ''
    });

    const [mensagemErro, setMensagemErro] = useState('');

    const handleChange = (keyName, e) => { setPassword({...password, [keyName]: e.target.value }); }

    const updatePassword = () => {
        let infoError = '';

        if (password.password != password.confirmPassword) {
            infoError = 'A senha é diferente da confirmação de senha'
        }

        if (password.password.length < 6) {
            infoError = 'A senha deve conter pelo menos 6 caracteres'
        }
        

        if (!infoError) {
            var user = firebase.auth().currentUser;
            var newPassword = password.password;
            
            user.updatePassword(newPassword).then(function() {
                setPassword({
                    ...password,
                    password: '',
                    confirmPassword: ''                    
                })
                alert('mensagem verde: senha alterada com sucesso');
            }).catch(function(error) {
              console.log('Erro na troca de senha::::', error)
            });
        }
        else {
            alert(infoError);
            setMensagemErro(infoError)
        }
    }

    return (

        <Grid
            container spacing={3}
        >
            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    error={password.password != password.confirmPassword}
                    helperText="Senha"
                    label="Senha"
                    margin="dense"
                    name="password"
                    type="password"
                    required
                    onChange={handleChange }
                    onChange={sender => handleChange('password', sender)}
                    variant="outlined"
                />
            </Grid>

            <Grid item xs={12} md={6}>
                <TextField
                    fullWidth
                    error={password.password != password.confirmPassword}
                    helperText="Confirmar senha"
                    label="Confirmação da senha"
                    margin="dense"
                    name="confirmPassword"
                    type="password"
                    required
                    onChange={sender => handleChange('confirmPassword', sender)}
                    value={password.confirmPassword}
                    variant="outlined"
                />
            </Grid>

            <Grid item xs={12} md={12}>
                <Button
                    disabled={!password.password} 
                    fullWidth
                    variant="contained" color="primary"
                    onClick={updatePassword}
                >
                    Salvar
                </Button>
            </Grid>

        </Grid>
    );
}


export default ChangePassword;