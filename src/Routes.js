import React, { useEffect, useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Category as CategoryView,
  CityHallCreate as CityHallCreateView,
  MeuExemplo as MeuExemploBanana,
  DenunciationList as DenunciationView,
  CommentsList as CommentsView,
  Profile as ProfileView,
  CreateUser as CreateUserView,
  ProfileCoordinator as ProfileCoordinatorView,
  CommentsListCoordinator as CommentsCoordinatorView,
  DenunciationListCoordinator as DenunciationCoordinatorView,
  AproveCityHallList as AproveCityHallListView,
  CategoryList as CategoryListView,  
  PrefecturesList as PrefecturesListView,
  CitizensList as  CitizensListView,
  ProfileMaster as ProfileMasterView,


} from './views';

import currentUser from 'utils/AppUser'


const Routes = () => {

const [roles, setRoles] = useState({
  loaded: false
});

  useEffect(() => {
    currentUser().then(user => {
      console.log('UserRoles::::', user)
      setRoles({
        ...roles,
        loaded: true,
        admin: user.roles.indexOf("admin"),
        coordinator: user.roles.includes('coordinator'),
        moderator: user.roles.includes('moderator'),
        city_hall: user.roles.includes('city_hall'),
        user: user.roles.includes('user')
      })
    })
    .catch(() => {
      setRoles({
        ...roles,
        loaded: true
      })
    }) 
  }, [])


  if (roles.loaded) {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <RouteWithLayout
        component={CreateUserView}
        exact
        layout={MainLayout}
        path="/novo-usuario"
        permission={roles.admin || roles.admin_prefeitura}
      />      
      <RouteWithLayout
        component={CategoryView}
        exact
        layout={MainLayout}
        // permission={roles.admin}
        path="/category"
        permission={roles.coordinator}
      />
      <RouteWithLayout
        component={MeuExemploBanana}
        exact
        layout={MainLayout}
        path="/meu-exemplo"
        permission={true}
      />
      <RouteWithLayout
        component={CityHallCreateView}
        exact
        layout={MainLayout}
        path="/cityhall-create"
      />      
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
        permission={true}
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
        permission={true}
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/meu-perfil"
        permission={true}
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <Route
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />

        {/* Rotas do Moderador */}

        <RouteWithLayout
        component={DenunciationView}
        exact
        layout={MainLayout}
        path="/denunciations"
        permission={roles.admin}
       />      

      <RouteWithLayout
        component={CommentsView}
        exact
        layout={MainLayout}
        path="/reporting-comments"
        permission={roles.admin}
       />

      <RouteWithLayout
        component={ProfileView}
        exact
        layout={MainLayout}
        path="/profile"
      />

       {/* FIM Rotas do Moderador */}


       {/* Rotas do Coordinator */}

       <RouteWithLayout
        component={DenunciationCoordinatorView}
        exact
        layout={MainLayout}
        path="/denunciations-coordinator"
       />      

      <RouteWithLayout
        component={CommentsCoordinatorView}
        exact
        layout={MainLayout}
        path="/reporting-comments-coordinator"
       />

      <RouteWithLayout
        component={ProfileCoordinatorView}
        exact
        layout={MainLayout}
        path="/profile-coordinator"
      />

       {/* FIM Rotas do Coordinator */}


        {/* Rotas do Master */}

        <RouteWithLayout
        component={PrefecturesListView}
        exact
        layout={MainLayout}
        path="/prefectures"
       />      
    
      <RouteWithLayout
        component={CitizensListView}
        exact
        layout={MainLayout}
        path="/citizens"
       /> 

      <RouteWithLayout
        component={ProfileMasterView}
        exact
        layout={MainLayout}
        path="/profile-master"
      />

       {/* FIM Rotas do Master */}

       <RouteWithLayout
        component={AproveCityHallListView}
        exact
        layout={MainLayout}
        path="/cityhall-aprove"
      />

      <RouteWithLayout
        component={CategoryListView}
        exact
        layout={MainLayout}
        path="/categorias"
      />
       
      <Route
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
}
else {
  return <h1>carregando...</h1>
}
};

export default Routes;
