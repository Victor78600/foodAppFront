import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const [members, setMembers] = useState({
    username: "",
    login: "",
    favorite: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMembers({ ...members, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://foodapp.adaptable.app/members",
        members
      );
      console.log("member added successfully:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setMembers({
        username: "",
        login: "",
        favorite: [],
      });
      //   members.map((member) => (
      //     <React.Fragment key={member.id}>
      //       {members.username === member.username
      //         ? localStorage.setItem("id", members.id)
      //         : console.log("raté")}
      //     </React.Fragment>
      //   ));
    } catch (error) {
      console.log("Error adding member:");
    }

    // members.map((member) => (
    //     //     <React.Fragment key={member.id}>
    //     //       {members.username === member.username
    //     //         ? localStorage.setItem("id", members.id)
    //     //         : console.log("raté")}
    //     //     </React.Fragment>
    //     //   ));
    // console.log(members);
    // localStorage.setItem("id", members.id);
  };
  return (
    <>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul>
            {/* <li>
            <label htmlFor="id">Identifiant:</label>
            <input
              type="text"
              id="id"
              name="id"
              value={members.username}
              onChange={handleChange}
            />
          </li> */}

            <li className="username">
              <label htmlFor="username">Username</label>
              <br />
              <input
                className="inputsConnection"
                type="text"
                id="username"
                name="username"
                value={members.username}
                minLength="4"
                required
                onChange={handleChange}
              />
            </li>
            <li className="password">
              <label htmlFor="password">Password</label>
              <br />
              <input
                className="inputsConnection"
                type="password"
                id="login"
                name="login"
                value={members.login}
                minLength="4"
                required
                onChange={handleChange}
              />
            </li>
            <div className="button">
              <button type="submit">Submit</button>
            </div>
            <div className="button"></div>
          </ul>
        </form>
        <button href="url/connexion" type="connexion">
          You already have an account, sign in here
        </button>
      </div>

    </>
  );
}

export default RegisterPage;
