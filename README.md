#  REGISTERATION PROCESS:

For do registeration process(register or signin a user), you should do blow steps respectively:

1- Use /verifyphonenumber due to its document. This route get phonenumber and send a random code to it.

2- Use /verifycode due to its document. This route check get phonenumber and code and check the code is currect. if the code is currect, you get a signin_token in response.

For register a user:

-    3- Use /register due to its document. This route get user information along signin_token and if there is no problem, register user with its info to database.

For signin a user:

-    4-Use /signin due to its document. This route get signin_token and if there is no problem, you get a user_token.


## Register 

**CREATE:** method => POST

You can read thier document as follow:

#### register(POST) "*rootEndPoint*/register":
**Description:** With this method you can create a user in database.

**Requst parameters:** 
- **In header:**
    - Authorization: 
    - required: YES
    - Description: The signin_token you get use /verifycode route. You should use this token with "Bearer " text first of it. Becarefull of sapace after Bearer text.
    - example: "Bearer eyJhbGciOiJIUzI1NiJ9.Mg.ikcgElRKwoqfHe4I1YP7xtaDuWigSqt-jeDuyqZ3NHw"
    
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
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 201,
            success: true,
            message: "user created"
        }
        ```

***

- Status code: 409
    - description: If same national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 409,
            success: false,
            message: "a user already existed with this national_id_number"
        }
        ```

***

- Status code: 409
    - description: If same phonenumber already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 409,
            success: false,
            message: "a user already existed with this phonenumber"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 403
    - description: If signin_token is invalid, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 403,
            success: false,
            message: "invalid singin_token"
        }
        ```

***

- Status code: 400
    - description: If Authorization not provided or is invalid, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 400,
            "success": false,
            "message": "authorization not set"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## sginin

**READ:** method => GET

You can read thier document as follow:
#### signin(GET) "*rootEndPoint*/signin":
**Description:** You can signin a user with this route.

**Requst parameters:** 
- **In header:**
    - Authorization: 
    - required: YES
    - Description: The signin_token you get use /verifycode route. You should use this token with "Bearer " text first of it. Becarefull of sapace after Bearer text.
    - example: "Bearer eyJhbGciOiJIUzI1NiJ9.Mg.ikcgElRKwoqfHe4I1YP7xtaDuWigSqt-jeDuyqZ3NHw"
    
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            usertoken: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            message: "signin operation done successfully",
            usertoken: "eyJhbGciOiJIUzI1NiJ9.Mg.ikcgElRKwoqfHe4I1YP7xtaDuWigSqt-jeDuyqZ3NHw"
        }
        ```

***

- Status code: 403
    - description: If signin_token is invalid, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 403,
            success: false,
            message: "invalid singin_token"
        }
        ```

***

- Status code: 404
    - description: If the user that you are try to signin doesn't exist, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "user doesn't found"
        }
        ```

***

- Status code: 400
    - description: If Authorization not provided or is invalid, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 400,
            "success": false,
            "message": "authorization not set"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## verifyphonenumber

**READ:** method => GET

You can read thier document as follow:
#### verifyphonenumber(GET) "*rootEndPoint*/verifyphonenumber":
**Description:** With this method you can verify a phonenumber. This route send code to phonenumber via sms.

**Requst parameters:** 
- **In query:**
    - phonenumber: 
    - required: YES
    - type: string
    - Description: The phone number that you want to send a code to it.
    - example: "09140466901"

**Response body:** 
- Status code: 200
    - description: If there is no problem, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            message: "code sent successfully"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 503
    - description: If there is some error about sms panel, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 503,
            success: false,
            message: "sms panel error"
        }
        ```

***

- Status code: 500
    - description: If some internal server error happend, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
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
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            token: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            message: "code verification done successfully",
            signin_token: "eyJhbGciOiJIUzI1NiJ9.MTA.DDWsk0GAZVeeHZFxWKJrJmWXzk1cDYfui2RJIo6Btjc"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 404
    - description: If the code is invalid, you get a response like this
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "code is invalid"
        }
        ```

***

- Status code: 500
    - description: If some internal server error happend, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## send a twitt 

**CREATE:** method => POST

You can read thier document as follow:

#### sendtwitt(POST) "*rootEndPoint*/sendtwitt":
**Description:** With this method you can create a twitt in database belong to a specific user.

**Requst parameters:** 
- **In header:**
    - Authorization: 
    - required: YES
    - Description: The user_token you want to submit a twitt for it. You should use this token with "Bearer " text first of it. Becarefull of sapace after Bearer text.
    - example: "Bearer eyJhbGciOiJIUzI1NiJ9.Mg.ikcgElRKwoqfHe4I1YP7xtaDuWigSqt-jeDuyqZ3NHw"
    
- **In body:**
    - text: 
    - required: YES
    - type: string
    - Description: Text of the twitt.
    - example: "some oponion write here and sent to api"
    
- **In body:**
    - replay_to: 
    - required: NO
    - type: string
    - Description: If the twitt is replay to another twitt, this parameter should be provide.
    - example: "112"
    
- **In body:**
    - img_link: 
    - required: YES
    - type: string
    - Description: If the twitt contain image, you should first uploud photo to api and then provide its link as value of this parameter.
    - example: "http://test.com/239490234890284kl34.png"

**Response body:** 
- Status code: 201
    - description: if there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 201,
            success: true,
            message: "twitt submited"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 400
    - description: If Authorization not provided or is invalid, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 400,
            "success": false,
            "message": "authorization not set"
        }
        ```

***

- Status code: 401
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 401,
                success: false,
                message: "user unauthorized"
        }
        ```

***

- Status code: 404
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "user doesn't found"
        }
        ```

***

- Status code: 404
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "parent twitt not found"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## get a twitt

**READ:** method => GET

You can read thier document as follow:
#### gettwitt(GET) "*rootEndPoint*/gettwitt":
**Description:** With this method you can get twitt details, its replays, its owner, ex using twitt_id:

**Requst parameters:** 
- **In query:**
    - twitt_id: 
    - required: YES
    - type: string
    - Description:
    - example: "10"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            twitt: <Object>{
                twitt_id: <Integer>,
                text: <String>,
                img_link: <String>,
                replay_to: <Integer>,
                date: <String>,
                owner_id: <Integer>,
                replays: <Array of Twitt Object>[
                    {
                        twitt_id: <Integer>,
                        text: <String>,
                        img_link: <String>,
                        replay_to: <Integer>,
                        date: <String>,
                        owner_id: <Integer>
                    }
                ]
            }
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            twitt: {
                twitt_id: 5,
                text: "plain text",
                img_link: "http://domain.com/image.png",
                replay_to: null,
                date: "2020-09-12T10:57:37.586Z",
                owner_id: 10,
                replays: [
                    {
                        twitt_id: 9,
                        text: "plain text",
                        img_link: "http://domain.com/image2.png",
                        replay_to: 5,
                        date: "2020-09-12T10:59:49.943Z",
                        owner_id: 14
                    }
                ]
            }
        }
        ```

***

- Status code: 404
    - description: If the twitt_id is invalid, you get a response like this
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "twitt not found"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## get twitts belong to a user

**READ:** method => GET

You can read thier document as follow:
#### getuserTwitts(GET) "*rootEndPoint*/getusertwitts":
**Description:** With this method you can get twitt details and its replays belong to a specific user:

**Requst parameters:** 
- **In query:**
    - user_id: 
    - required: YES
    - type: string
    - Description: The user_id of the user you want to get its twitts.
    - example: "10"

**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            twitt: <Array of Twitt Object>[
                {
                    twitt_id: <Integer>,
                    text: <String>,
                    img_link: <String>,
                    replay_to: <Integer>,
                    date: <String>,
                    owner_id: <Integer>
                }
            ]
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            twitt: [
                {
                    twitt_id: 5,
                    text: "plain text",
                    img_link: "http://domain.com/image.png",
                    replay_to: null,
                    date: "2020-09-12T10:57:37.586Z",
                    owner_id: 10,
                },
                {
                    twitt_id: 6,
                    text: "plain text",
                    img_link: "http://domain.com/image2.png",
                    replay_to: null,
                    date: "2020-09-12T10:57:37.586Z",
                    owner_id: 10,
                }
            ]
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***

## delete a twitt

**READ:** method => GET

You can read thier document as follow:
#### deletetwitt(GET) "*rootEndPoint*/deletetwitt":
**Description:** With this method you can delete a specific twitt using twitt_id

**Requst parameters:** 
- **In header:**
    - Authorization: 
    - required: YES
    - Description: The signin_token you get use /verifycode route. You should use this token with "Bearer " text first of it. Becarefull of sapace after Bearer text.
    - example: "Bearer eyJhbGciOiJIUzI1NiJ9.Mg.ikcgElRKwoqfHe4I1YP7xtaDuWigSqt-jeDuyqZ3NHw"
    
- **In query:**
    - twitt_id: 
    - required: YES
    - type: string
    - Description: Id of the twitt you want to delete it.
    - example: "10"
**Response body:** 
- Status code: 200
    - description: If there is no problem, the server return this object as response:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 200,
            success: true,
            message: "twitt deleted successfuly"
        }
        ```

***

- Status code: 404
    - description: If the the twitt you are looking for is find, you get a response like this
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "twitt not found"
        }
        ```

***

- Status code: 404
    - description: If the user you are provide with header is not find, you get a response like this
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "user not found"
        }
        ```

***

- Status code: 403
    - description: If the twitt you want to delete is not belong to the user you provide in header, you get a response like this
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 404,
            success: false,
            message: "this twitt is not belong to current user"
        }
        ```

***

- Status code: 422
    - description: If some parameter don't provided or provided wrong, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>,
            field: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            "status": 422,
            "success": false,
            "message": "username null or undefined",
            "field": "username"
        }
        ```

***

- Status code: 500
    - description: If same phonenumber or national_id_number already exists in database, you get a response like this:
    - body:

        ```javascript
        {
            status: <Integer>,
            success: <Boolean>,
            message: <String>
        }
        ```
        
    - for example the response body may be like this:
        
        ```javascript
        {
            status: 500,
            success: false,
            message: "internal server error"
        }
        ```

***
