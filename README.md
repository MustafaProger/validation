# 📝 Form Validation

This repository contains a client-side form validation implementation using JavaScript. This function helps check the correctness of input for names, phone numbers, emails, and passwords.

## 🚀 Features

- **🔍 Easy Validation:** Simple integration into existing forms.
- **🎨 Customizable:** Easily modify error messages and validation rules.
- **📱 Mobile Support:** Works seamlessly on all devices.
- **🛠️ Password Check:** Ensures passwords meet specified requirements.

## 🌐 Demo

You can see a live demo of the validation [here](https://mustafaproger.github.io/validation/).

## 📥 Installation

To use or modify the validation in your project, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/MustafaProger/validation.git
   ```

2. **Import into Your Project:**

   Copy the relevant JavaScript code into your project. The main file is:

   - `js/modules/validation.js`: Contains the validation logic.

## 🛠️ Usage

To use the validation function, call it with the necessary parameters:

```javascript
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const isValid = validation(
        form,
        'input[name="username"]',
        'input[name="phone"]',
        'input[name="password"]',
        'input[name="email"]'
    );

    if (isValid) {
        // Submit the form or perform other actions
        console.log("Form submitted!");
    }
});
```

### Example

Here’s what an example HTML form looks like:

```html
<form>
    <input type="text" name="username" placeholder="Name" required>
    <span class="name__error"></span>
    
    <input type="text" name="phone" placeholder="Phone" required>
    <span class="phone__error"></span>
    
    <input type="password" name="password" placeholder="Password" required>
    <span class="password__error"></span>
    
    <input type="email" name="email" placeholder="Email" required>
    <span class="email__error"></span>
    
    <button type="submit">Submit</button>
</form>
```

## 🤝 Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Improvements, bug fixes, and new features are welcome! 🎉