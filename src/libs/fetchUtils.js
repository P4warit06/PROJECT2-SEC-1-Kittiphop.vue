async function getItems(url) {
  try {
    const data = await fetch(url)
    const items = await data.json()
    return items
  } catch (error) {
    throw new Error("can not get your items")
  }
}

async function getItemById(url, id) {
  try {
    const data = await fetch(`${url}/${id}`)
    const item = await data.json()
    return item
  } catch (error) {
    if (data.status === 404) return undefined
    throw new Error("can not get your item")
  }
}

async function getCartById(url, id) {
  try {
    const data = await fetch(`${url}/${id}/carts`)
    const item = await data.json()
    return item
  } catch (error) {
    if (data.status === 404) return undefined
    throw new Error("can not get your item")
  }
}

async function deleteItemById(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    })
    return res.status
  } catch (error) {
    throw new Error("can not delete your item")
  }
}


async function addItem(url, newItem) {
  try {
    const allItems = await getItems(url)
    const newId =
      allItems.length > 0
        ? String(Math.max(...allItems.map((item) => parseInt(item.id))) + 1)
        : "1"

    const categoryImages = {
      'Electronics': '/product-images/default-category-images/electronics.png',
      'Audio': '/product-images/default-category-images/audio.jpg',
      'Accessories': '/product-images/default-category-images/accessories.png',
      'Wearables': '/product-images/default-category-images/wearables.png'
    }

    const productWithDefaults = {
      ...newItem,
      id: newId,
      image: newItem.image || categoryImages[newItem.category] || '/product-images/default-category-images/default.jpg'
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productWithDefaults),
    })
    const addedItem = await res.json()
    return addedItem
  } catch (error) {
    throw new Error("can not add your item")
  }
}



async function editItem(url, id, editItem) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...editItem,
      }),
    })
    const editedItem = await res.json()
    return editedItem
  } catch (error) {
    throw new Error("can not edit your item")
  }
}



// 062 Pongsakorn's
async function registerUser(url, userData) {
  try {
    const allUsers = await getItems(`${url}/users`)
    const newId =
      allUsers.length > 0
        ? String(Math.max(...allUsers.map((user) => parseInt(user.id))) + 1)
        : "1"

    const hashedPassword =  btoa(userData.password)

    const newUser = {
      id: newId,
      username: userData.username,
      fullname: userData.fullname,
      password: hashedPassword,
      email: userData.email,
      role: "user",
      location: userData.location ,
      contact: userData.contact,
      balance: 0,
      carts: []
    }

    const res = await fetch(`${url}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    })

    if (!res.ok) {
      throw new Error(`Registration failed with status: ${res.status}`)
    }

    const addedUser = await res.json()
    return addedUser
  } catch (error) {
    console.error("Registration error:", error)
    throw new Error("Cannot register user: " + error.message)
  }
}
// 062 Pongsakorn's
async function checkExistEmail(url, email) {
  try {
    const users = await getItems(`${url}/users`)
    return users.some((user) => user.email === email)
  } catch (error) {
    console.error("Email check error:", error)
    throw new Error("Cannot check email: " + error.message)
  }
}

// 062 Pongsakorn's
async function login(url, email, password) {
  try {
    const users = await getItems(`${url}/users`)
    const hashedInputPassword = btoa(password)
    const user = users.find(
      (user) => user.email === email && user.password === hashedInputPassword
    )
    if (!user) {
      throw new Error("Invalid email or password")
    }
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword
  } catch (error) {
    console.error("Login error:", error)
    throw new Error("Login failed: " + error.message)
  }
}

async function topUpBalance(url, userId, amount) {
  try {
    const user = await getItemById(`${url}/users`, userId)
    if (!user) throw new Error("User not found")

    const currentBalance = user.balance || 0
    
    const newBalance = currentBalance + amount

    const updatedData = { 
      ...user,
      balance: newBalance
    }

    const response = await fetch(`${url}/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) throw new Error("Update failed")
    
    return await response.json()
  } catch (error) {
    console.error("Top-up error:", error)
    throw new Error("Failed to top up: " + error.message)
  }
}



export {
  getItems,
  getItemById,
  deleteItemById,
  addItem,
  editItem,
  registerUser,
  checkExistEmail,
  login,
  topUpBalance,
}
 