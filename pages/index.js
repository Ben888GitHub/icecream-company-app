import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, DropdownButton, Dropdown } from "react-bootstrap";
import { DateTime } from "luxon";
import randtoken from "rand-token";

// Function to display errors
function ErrorMessage({ error }) {
  if (error) {
    switch (error.type) {
      case "required":
        return <p style={{ color: "red" }}>^This field is required</p>;
      case "maxLength":
        return <p style={{ color: "red" }}>Maximum Length: 20</p>;
      case "pattern":
        return (
          <p style={{ color: "red" }}>Please enter a valid email address</p>
        );
      default:
        return null;
    }
  }
  return null;
}

export default function Home() {
  // const [inputValue, setInputValue] = useState([]);
  const [items, setItems] = useState([{}]);
  // const [items, setItems] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [flavor, setFlavor] = useState("");

  const [date, setDate] = useState("");

  const [nameOutput, setNameOutput] = useState("Name");
  const [emailOutput, setEmailOutput] = useState("Email");
  const [flavorOutput, setFlavorOutput] = useState("Flavor");
  const [randomToken, setRandomToken] = useState("Token");

  const [showComplete, setShowComplete] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const appendAll = (text1, text2, text3) => {
    // const newItems = [...items, { text }];
    var allElement = {};
    allElement.text1 = text1;
    allElement.text2 = text2;
    allElement.text3 = text3;
    const newItems = items.push({ allElement: allElement });
    setItems(newItems);
  };

  const { register, errors, handleSubmit } = useForm();

  // Function to submit form
  const onSubmit = (data) => {
    console.log(data);
    console.log(data.firstName);
    console.log(data.email);
    console.log(data.flavor);
    // alert(JSON.stringify(data));

    // appendName(name);
    // appendEmail(email);
    appendAll(name, email, flavor); // The arguments from the from values
    // appendAll(data);
    console.log(items[1].allElement);
    console.log(items[1].allElement.text1); //name
    console.log(items[1].allElement.text2); //email
    console.log(items[1].allElement.text3); //flavor

    setNameOutput(items[1].allElement.text1); // Update and display the written name
    setEmailOutput(items[1].allElement.text2); // Update and display the written email
    setFlavorOutput(items[1].allElement.text3); // Update and display the written flavor

    var token = randtoken.generate(6); // Generate 6 random alphanumeric tokens
    console.log(token);
    setRandomToken(token);

    setShowComplete(!showComplete);
    if (!data.firstName || !data.email || !data.flavor) {
      setShowComplete(showComplete);
    } else if (data.firstName && data.email && data.flavor) {
      setShowComplete(!showComplete);
      setShowForm(!showForm);
    }

    var date = DateTime.local().toISO(); // Luxon Date (UTC ISO)
    setDate(date);

    setName("");
    setEmail("");
    setFlavor("");

    setItems([{}]);
  };

  const backToForm = () => {
    setShowComplete(false);
    setShowForm(true);
    window.location.reload(false);
  };

  return (
    <div className="container">
      <Head>
        <title>Ice Cream Company</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* <h2 className="title">Welcome to Ice Cream Company</h2>
        <p>{"\n"}</p> */}
        <p style={{ fontSize: 35, fontWeight: "500" }}>ICE CREAM GIVEAWAY</p>
        <p>{"\n"}</p>
        {showForm && (
          <div
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              maxWidth: "800px",
              marginTop: "-2rem",
            }}
          >
            <form
              style={{ borderRadius: 20 }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <p style={{ fontSize: 30 }}>Fill the details</p>
              <p style={{ fontSize: 20, marginTop: 10 }}>Name:</p>
              <input
                style={{ fontSize: 20 }}
                name="firstName"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ref={register({ required: true, maxLength: 20 })}
              />
              <ErrorMessage error={errors.firstName} />
              <p>{"\n"}</p>
              <p>{"\n"}</p>

              <p style={{ fontSize: 20, marginTop: 15 }}>Email:</p>
              <input
                style={{ fontSize: 20 }}
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
              <ErrorMessage error={errors.email} />

              <p style={{ fontSize: 20, marginTop: 15 }}>Select your flavor:</p>
              <select
                style={{ fontSize: 20 }}
                name="flavor"
                placeholder="flavor"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                ref={register({ required: true })}
              >
                <option value="">Choose...</option>
                <option value="chocolate">Chocolate</option>
                <option value="strawberry">Strawberry</option>
                <option value="vanilla">Vanilla</option>
              </select>
              <ErrorMessage error={errors.flavor} />

              <p>{"\n"}</p>
              <p>{"\n"}</p>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <input style={{ fontSize: 20 }} type="submit" /> */}
                <button
                  style={{ fontSize: 20, marginTop: 20 }}
                  type="submit"
                  // onClick={() => setShowComplete(!showComplete)}
                  // onClick={() => {if }}
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        )}
        {showComplete && (
          <div className="card">
            <div>
              <p style={{ fontSize: 22 }}> Thank you for sharing, {date}</p>
              <p>{"\n"}</p>
            </div>
            <div>
              <p>{"\n"}</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 22 }}>Name: {nameOutput} </p>
              <p>{"\n"}</p>
            </div>
            <div>
              <p>{"\n"}</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 22 }}>Email: {emailOutput} </p>
              <p>{"\n"}</p>
            </div>
            <div>
              <p>{"\n"}</p>
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 22 }}>Flavor: {flavorOutput} </p>
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontSize: 22 }}>Token: {randomToken} </p>
            </div>
            <div style={{ marginTop: 15 }}>
              <button
                onClick={backToForm}
                style={{ fontSize: 20 }}
                type="button"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </main>

      <p>{"\n"}</p>
      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.8rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: -2rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
