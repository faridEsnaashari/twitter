## Register 

**CREATE:** method => POST

You can read thier document as follow:

#### register(POST) "*rootEndPoint*/register":
**Description:** With this method you can create a user in database and then a code send to him/her mobile phone number. This user is invalid when you create it with this method and route. for validate a user you should use verifycode route. 

**Requst parameters:** 
- **In body:**
    - username: 
    - required: NO
    - type: string
    - Description: The name of the user you want to create it.
    - example: "farid"

- **In body:**
    - userfamily: 
    - required: NO
    - type: string
    - Description: The family of the user you want to create it.
    - example: "esnaashari"
    
- **In body:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description: The phone number of the user you want to create it.
    - example: "09140466901"
    
- **In body:**
    - national_id_number: 
    - required: YES
    - type: string
    - Description: The national_id_number of the user you want to create it.
    - example: "1273147499"

**Response body:** 
- Status code: 201
    - description: if there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "user created"
        }
        ```

***

- Status code: 409
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "user already existed"
        }
        ```

***

## sginin

**READ:** method => GET

You can read thier document as follow:
#### signin(GET) "*rootEndPoint*/signin":
**Description:** you can signin a user with this route. A verification code send to user.

**Requst parameters:** 
- **In query:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description: The phonenumber of the user you want to sign it in.
    - example: "09140466901"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "code sent successfully"
        }
        ```

***

- Status code: 404
    - description: If the user that you are try to signin doesn't exist, you get a response like this:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "user doesn't found"
        }
        ```

***

## sendverificationcode

**READ:** method => GET

You can read thier document as follow:
#### sendverificationcode(GET) "*rootEndPoint*/sendverificationcode":
**Description:** With this method you can send a verification code to a number:

**Requst parameters:** 
- **In query:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description: The phone number that you want to send a code to it.
    - example: "09140466901"

- **In query:**
    - code: 
    - required: YES
    - type: string
    - Description: The code you want to send.
    - example: "12855"

**Response body:** 
- Status code: 200
    - description: If the user that you are try to signin doesn't exist, you get a response like this:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "verification code sent"
        }
        ```

***

- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "verification code sent"
        }
        ```

***

## verifycode

**READ:** method => GET

You can read thier document as follow:
#### verifycode(GET) "*rootEndPoint*/verifycode":
**Description:** With this method you can check a code and a number related to it:

**Requst parameters:** 
- **In query:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description:
    - example: "09140466901"

- **In query:**
    - code: 
    - required: YES
    - type: string
    - Description:
    - example: "12558"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            token: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            token : "eyJhbGciOiJIUzI1NiJ9.MTA.DDWsk0GAZVeeHZFxWKJrJmWXzk1cDYfui2RJIo6Btjc"
        }
        ```

***

- Status code: 404
    - description: If the code is invalid, you get a response like this
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "code invalid"
        }
        ```

***

- Status code: 404
    - description: If the phonenumber not found, you get a response like this:
    - body:

        ```javascript
        {
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            message: "phone number not found"
        }
        ```

***