//import { useEffect, useState } from "react"
import questionsBiology from "./Questions/Biology"
import questionsGeography from "./Questions/Geography"
import questionsHistory from "./Questions/History"
import "./style1.css"

const AsyncAwait = () => {
  const questionsAll = [...questionsBiology, ...questionsHistory, ...questionsGeography]
  // const [users, setUsers] = useState([])

  // const fetchData = async () => {
  //   const response = await fetch("http://localhost:3000/questions")
  //   const data = await response.json()
  //   setUsers(data)
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])

  // lista pytań
  return (
    <div  className="questionsTable">
    <table>
        <th>Pytanie</th>
        <th>Typ</th>
        <th>Kategoria</th>

        {
            questionsAll.map((elem) => (
                <tr>
                    <td>{elem.question}</td>
                    <td>{elem.type}</td>
                    <td>{elem.category}</td>
                </tr>
            ))
        }
    </table>
</div>
  )
}

export default AsyncAwait