async function getItems(url) {
  try {
    const data = await fetch(url);
    const items = await data.json();
    return items;
  } catch (error) {
    throw new Error("can not get your items");
  }
}
async function getItemById(url, id) {
  try {
    const data = await fetch(`${url}/${id}`);
    const item = await data.json();
    return item;
  } catch (error) {
    if (data.status === 404) return undefined;
    throw new Error("can not get your item");
  }
}

async function deleteItemById(url, id) {
  try {
    const res = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });
    return res.status;
  } catch (error) {
    throw new Error("can not delete your item");
  }
}


async function addItem(url, newItem) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        ...newItem,
      }),
    });
    const addedItem = await res.json();
    return addedItem;
  } catch (error) {
    throw new Error("can not add your item");
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
    });
    const editedItem = await res.json();
    return editedItem;
  } catch (error) {
    throw new Error("can not edit your item");
  }
}

// New function to register users
async function registerUser(url, userData) {
  try {
    // Get all users to generate a new ID
    const allUsers = await getItems(`${url}/users`);
    
    // Generate a new ID (highest ID + 1)
    const newId = allUsers.length > 0 
      ? String(Math.max(...allUsers.map(user => parseInt(user.id))) + 1) 
      : "1";
    
    // Create new user object with default role "user"
    const newUser = {
      id: newId,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      role: "user",
      location: userData.location || " ",
      contact: userData.contact || " "
    };
    
    // Add the new user to the database
    const res = await fetch(`${url}/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    
    if (!res.ok) {
      throw new Error(`Registration failed with status: ${res.status}`);
    }
    
    const addedUser = await res.json();
    return addedUser;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error('Cannot register user: ' + error.message);
  }
}

// Check if email already exists
async function checkEmailExists(url, email) {
  try {
    const users = await getItems(`${url}/users`);
    return users.some(user => user.email === email);
  } catch (error) {
    console.error("Email check error:", error);
    throw new Error('Cannot check email: ' + error.message);
  }
}

export { 
  getItems, 
  getItemById, 
  deleteItemById, 
  addItem, 
  editItem, 
  registerUser,
  checkEmailExists 
}
