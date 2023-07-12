"use client";
import { useState, useEffect } from "react";

export default function Home() {
  //set state defaults
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isHomeworld, setIsHomeworld] = useState(false);
  const [url, setURL] = useState("https://swapi.dev/api/people/");

  //handle going to next page
  function paginateNext() {
    if (data.next !== null && data.next !== undefined) {
      setURL(data.next);
    } else {
      alert("bad url");
    }
  }

  //handle previos page
  function paginatePrevious() {
    if (data.previous !== null && data.previous !== undefined) {
      setURL(data.previous);
    } else {
      alert("bad url");
    }
  }

  //handle homeworld
  const homeworld = (str) => () => {
    //get value passed from card
    console.log(str);
    //update URL
    setURL(str);
    setIsHomeworld(true);
  };

  //reset to default
  function reset() {
    var tempURL = "https://swapi.dev/api/people/";
    //set URL to default
    setURL(tempURL);
  }

  //handle search
  const search = (event) => {
    //if 'enter' pressed
    if (event.key === "Enter") {
      //update URL
      setURL("https://swapi.dev/api/people/?search=" + event.target.value);
    }
  };

  useEffect(() => {
    //set loading to true while data is fetching
    setLoading(true);
    //log URL for debugging
    console.log("URL", url);
    //call API

    const tempUrl = new URL(url);
    var type = tempUrl.pathname.split("/").filter((part) => part !== "")[1];
    console.log(type);
    if (type == "people") {
      setIsHomeworld(false);
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        //log data output for debugging
        console.log("data", data);

        //set data to result of API call
        setData(data);
        //set laoding to false
        setLoading(false);
      });
    //function runs once at runtime, and again every time 'url' is changed
  }, [url]);

  //check if loading
  if (isLoading)
    return (
      //define loader
      <div className="flex justify-center items-center h-screen">
        <div
          className="w-36 h-36 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
        ></div>
      </div>
    );

  //handle data being null for initial call
  if (!data)
    return (
      <div className="flex justify-center items-center h-screen font-semibold">
        NO DATA
      </div>
    );

  return (
    <div>
      <h1 className="text-center font-semibold text-xl">Star Wars Data</h1>

      <div className="flex justify-center items-center">
        <input
          //searchbar
          className="grid rounded-md mt-6 place-items-center text-black"
          onKeyDown={search}
          placeholder="Search"
        ></input>
      </div>
      <div className="flex justify-center items-center shadow-sm rounded-md m-5">
        <div
          onClick={paginatePrevious}
          className="rounded-l-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Previous
        </div>
        <div
          onClick={paginateNext}
          className="rounded-r-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Next
        </div>
        <div
          // reset button
          onClick={reset}
          className=" m-5 rounded-lg border border-gray-200 bg-white text-sm font-medium px-4 py-2 text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          Reset
        </div>
      </div>

      {isHomeworld ? (
        <div
          className="rounded overflow-hidden shadow-lg bg-gray-800 m-6 p-2"
          key={data.name}
        >
          <p className="m-2 text-center ">Name: {data.name}</p>
          <p className="m-2 text-center ">Climate: {data.climate}</p>
          <p className="m-2 text-center ">Diameter: {data.diameter}m</p>
          <p className="m-2 text-center ">Gravity: {data.gravity}</p>
          <p className="m-2 text-center ">
            Orbital period: {data.orbital_period}
          </p>
          <p className="m-2 text-center ">Population: {data.population}</p>
          <p className="m-2 text-center ">
            Rotation period: {data.rotation_period}
          </p>
          <p className="m-2 text-center ">
            Surface water: {data.surface_water}
          </p>
          <p className="m-2 text-center ">Terrain: {data.terrain}</p>
        </div>
      ) : (
        ""
      )}

      <div className="lg:grid lg:grid-cols-5 lg:gap-4">
        {data?.results?.map((user) => (
          //map and create card

          <div
            className="rounded overflow-hidden shadow-lg bg-gray-800 m-6 p-2"
            key={user.name}
          >
            <p className="m-2 text-center lg:text-left">Name: {user.name}</p>
            <p className="m-2 text-center lg:text-left">
              Born: {user.birth_year}
            </p>
            <p className="m-2 text-center lg:text-left">
              Height: {user.height}cm
            </p>
            <p className="m-2 text-center lg:text-left">
              Eye colour: {user.eye_color}
            </p>
            <p className="m-2 text-center lg:text-left">
              Hair colour: {user.hair_color}
            </p>
            <p className="m-2 text-center lg:text-left">
              Skin colour: {user.skin_color}
            </p>
            <p className="m-2 text-center lg:text-left">
              Weight: {user.mass}KG
            </p>
            <div class=" flex flex-col items-center">
              <button
                onClick={homeworld(user.homeworld)}
                className="m-2 text-center  bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
              >
                View Homeworld
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
