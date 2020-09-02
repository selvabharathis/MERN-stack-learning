import React from "react"
import "../styles.css"
import {API} from "../backend"
export default function Home() {
    console.log("API IS",API)
    return (
        <div>
            <h1 className="text-white">Hello front end</h1>
        </div>
    )
}