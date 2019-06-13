import React from "react";
import axios from "axios";

import SingleUser from "./SingleUser";

axios.defaults.baseURL =
  process.env.API_URL || "https://delphe-backend.herokuapp.com/api";

    class UserProfile extends React.Component {
    state = { 
        users: []
        };

        //GET WORKING
    componentDidMount() {
        console.log('NEW user profile props',this.state.users)
        axios
        .get("/users")
        .then(res => {
            this.setState({ users: res.data });
        })
        .catch(error => {
            console.log(error, { error: "could not get data" });
        });
    }

    getById = () => {
        console.log('USERS BY ID',this.state.users)
        // const id = this.state.user_id
        const user_id = localStorage.getItem("user_id");
        axios
        .get(`/users/${user_id}`)
        .then(res => {
            console.log(res.data);
            this.setState({
                users: res.data
            //   users: res.data.find(
            //     user => `${user.user_id}` === localStorage.getItem("user_id")
            //   )
            });
          })
        .catch(error => {
            console.error("USERS ERROR", error);
        });
    }

        // DELETE USERS
        // //firing weird getting error 
        // //Cannot read property 'preventDefault'   

        // deleteUsers = () => {
        // const user_id = localStorage.getItem("user_id");
        // axios
        // .get(`/users/${user_id}`)
        //     .then(res => {
        //         const users = res.data;
        //         this.setState({ users });
        //         window.location.reload();
        //         // this.props.history.push(`/users/${this.state.user.id}`);
        //         // console.log(res);
        //         // redirect
        //     })
        //     .catch(err => {
        //         console.log(err);
        //     });
        // };
        // //firing weird getting error 
        // //Cannot read property 'preventDefault'         
        // deleteUsers = e => {
        //     e.preventDefault();
        //     this.deleteUsers(this.state.user_id);
        // };

    updateUser = updatedUser => {
        console.log("HEY this is UPDATEUSER",updatedUser);
        const user_id = localStorage.getItem("user_id");
        axios
        .get(`/users/${user_id}`)
            .then(res => {console.log("HEY RES",res);
            this.setState({
                user: res.data.find(
                // user => `${user.user_id}` === localStorage.getItem("user_id")
                )
            });
            console.log("UPDATE successful!");
    
            // redirect
            this.props.history.push(`/users/${user_id}`);
            })
            .catch(err => {
            // this.getUser()
            console.log("UPDATE NOT WORKING",err);
            });
        };
    
        handleChange = e => {
        e.preventDefault();
        this.setState({user: {
            ...this.state.user,
            [e.target.name]: e.target.value,
            
        }});
        };
    
        onSubmitEditedUser = e => {
        e.preventDefault();
        this.updateUser(this.state.user);
        alert("YOU DID IT!!!!")
        this.setState({
            state: ''
        });
        };


  render() {
      console.log('UserProfile STATE',this.state)
    return (
      <>
        <h2>USERS</h2>
        {/* MAPPING ALL USERS */}
        {this.state.users
        .map(users => { 
        return <SingleUser user={users}/>;})}
        
      <div onClick={this.deleteUsers} className="">
        <button> Delete User</button>
      </div>
      </>
    );
  }
}

export default UserProfile;