import React, { useEffect, useState } from "react"
import './style.css'

const AsyncAwait = () => {
  const [users, setUsers] = useState([])

  //pobieranie uzytkownikow i wynikow
  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/users/get")
    const data = await response.json()
    setUsers(data)
    console.log(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <h1>Ranking of other players:</h1>
    <div className="tableRank">
      <div>
      <h3>User</h3>
          {users.map((user) => (
                <p>{user.login}</p>
            ))}
      </div>
      <div>
      <h3>Points</h3>
      {
          <p></p>
      }
      </div>
    </div>
</div>
  )
}

export default AsyncAwait