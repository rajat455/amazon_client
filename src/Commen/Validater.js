function validation({ firstName, lastName, email, password, confirm_password, fullName, phone, address, city, state, pincode }, type) {
   let arr = []
   if (type === "register") {
      if (!firstName) {
         arr.push({ key: "firstName", message: "Required filed Firstname is empty" })
      } else if (!(/^[A-Za-z]+$/.test(firstName)) || firstName.length < 3) {
         arr.push({ key: "firstName", message: "Firstname must contain at least 3 letters without numbers" })
      }
      if (!lastName) {
         arr.push({ key: "lastName", message: "Required field Lastname is Empty" })
      } else if (!(/^[A-Za-z]+$/.test(lastName)) || lastName.length < 3) {
         arr.push({ key: "lastName", message: "Lastname must contain at least 3 letters without numbers" })
      }
      if (!email) {
         arr.push({ key: "email", message: "Required field Email is Empty" })
         // eslint-disable-next-line
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
         arr.push({ key: "email", message: "Email formate is Invalid" })
      }
      if (!password) {
         arr.push({ key: "password", message: "Required field Password is Empty" })
      } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))) {
         arr.push({ key: "password", message: "Password is to weak" })
      }

      if (!confirm_password) {
         arr.push({ key: "confirm_password", message: "Required field Confirm-Password is Empty" })
      } else if (confirm_password !== password) {
         arr.push({ key: "confirm_password", message: "Confirm-Password and Password are not Match" })
      }

   } else if (type === "login") {
      if (!email) {
         arr.push({ key: "email", message: "Required field Email is Empty" })
         // eslint-disable-next-line
      } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
         arr.push({ key: "email", message: "Invalid Email" })
      }
      if (!password) {
         arr.push({ key: "password", message: "Required field Password is Empty" })
      } else if (!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password))) {
         arr.push({ key: "password", message: "Password is to weak" })
      }
   } else {
      if (!fullName) {
         arr.push({ key: "fullName", message: "Required field Fullname is Empty" })
      } else if (fullName.length < 3) {
         arr.push({ key: "fullName", message: "FullName must contain at least 3 letters without numbers" })
      }

      if (!address) {
         arr.push({ key: "address", message: "Rquired field Address is Empty" })
      } else if (address.length < 3) {
         arr.push({ key: "address", message: "Address is to short" })
      }

      if (!pincode) {
         arr.push({ key: "pincode", message: "Rquired field Pincode is Empty" })
      } else if (!Number(pincode) || pincode.length < 6) {
         arr.push({ key: "pincode", message: "Your Pincode is Invalid" })
      }

      if (!phone) {
         arr.push({ key: "phone", message: "Rquired field Phone is Empty" })
      } else if (phone.length < 10 || (!Number(phone[0]) || Number(phone[0]) < 6)) {
         arr.push({ key: "phone", message: "Your Phone is Invalid." })
      }

      if (!city) {
         arr.push({ key: "city", message: "Rquired field City is Empty" })
      } else if (city.length < 3) {
         arr.push({ key: "city", message: "Your City-Name is Invalid." })
      }

      if (!state) {
         arr.push({ key: "state", message: "Rquired field State is Empty" })
      } else if (state.length < 3) {
         arr.push({ key: "state", message: "Your State-Name is Invalid." })
      }
   }
   return arr
}

export default validation