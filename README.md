# Tour Management Backend (TypeScript)

A **production-ready** backend application built with **Node.js, Express.js, TypeScript, MongoDB** for managing tours, users, and payments.  
Includes **Role-Based Access Control**, **JWT Authentication** with refresh tokens, dynamic **Query Builder**, and **Payment Gateway Integration (SSLCommerz)**.

---

##  Features

- **Authentication & Authorization**
  - Access + Refresh Token based authentication
  - Role-based access control (User / Admin / Super Admin)
- **Tour Management**
  - Admin / Super Admin can create, update, delete tours
  - Public can view tour list & details
- **User Management**
  - Admin / Super Admin can manage users
- **Dynamic Query Builder**
  - Filtering, searching, sorting, field selection, pagination, and meta info
- **Payment Gateway**
  - Integrated with **SSLCommerz**
  - Payment initiation & webhook handling
- **Error Handling**
  - Global error handler
  - Zod validation error handler
  - Mongoose error handler
- **Security**
  - Environment variables with `.env`
  - Secure cookies for refresh tokens
  - Sanitized query & request data
- **Check env variable**

  
  ```
  const loadEnvVariables = (): EnvInterfaces => {
    const requiredEnvVariables: string[] = ["PORT", "MONGO_URI", "NODE_ENVIRONMENT", "ACCESS_SECRATE", "SUPER_ADMIN_PASSWORD", "SUPER_ADMIN_EMAIL", "ACCESS_EXPIERS", "REFRESH_SECRATE", "REFRESH_EXPIRED" , "GOOGLE_CLIENT_ID" , "GOOGLE_CLIENT_SECRET" , "GOOGLE_CALLBACK_URL" , "EXPRESS_SESSION_SECRATE" , "FRONTEND_URL"];

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variabl ${key}`)
        }
    });

    return {
        port: process.env.PORT as string,
        mongo_url: process.env.MONGO_URI as string,
        node_env: process.env.NODE_ENVIRONMENT as string,
        ACCESS_SECRATE: process.env.ACCESS_SECRATE as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
        ACCESS_EXPIERS: process.env.ACCESS_EXPIERS as string,
        REFRESH_EXPIRED: process.env.REFRESH_EXPIRED as string,
        REFRESH_SECRATE: process.env.REFRESH_SECRATE as string,
        GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET as string, 
        GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRATE : process.env.EXPRESS_SESSION_SECRATE as string,
        FRONTEND_URL : process.env.FRONTEND_URL as string,
    }
}

```

- **Payment Gateway**
  - sslcommerz

---

## 🛠 Tech Stack

- Typescript
- node.Js
- express.Js
- mongoDb
- mongoose
- zod

---
## 🛠 Dynamic QueryBuilder 

-find - filter - search - sort - pagination - metaData


export class QueryBuilder<T> {
    public queryModel: Query<T[], T>;
    public query: Record<string, string>;

    constructor(queryModel: Query<T[], T>, query: Record<string, string>) {
        this.queryModel = queryModel;
        this.query = query
    };

    filter(): this {
        const filter = { ...this.query };

        for (const value of excludeFild) {
            delete filter[value];
        };

        this.queryModel = this.queryModel.find(filter);

        return this

    };

    search(searchableFild: string[]): this {

        const searchTerm = this.query.searchTerm || "";
        const searchQuery = {
            $or: searchableFild.map((fild) => ({ [fild]: { $regex: searchTerm, $options: "i" } }))
        };

        this.queryModel = this.queryModel.find(searchQuery);

        return this

    };

    sort(): this {
        const sort = this.query.sort || "-createdAt";
        this.queryModel = this.queryModel.sort(sort);
        return this;
    };
    select(): this {
        const fields = this.query.fields?.split(",").join(" ") || "";
        this.queryModel = this.queryModel.select(fields);
        return this;
    }


    paginate(): this {

        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;

        this.queryModel = this.queryModel.limit(limit).skip(skip);

        return this;
    };

    build() {
        return this.queryModel
    };

    async getMeta() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;

        const totalDocumtnt = await this.queryModel.model.countDocuments();
        const totalPage = Math.ceil(totalDocumtnt / limit);

        return { page, limit, total: totalDocumtnt, totalPage }

    }

}

```

## How to Install Tour management Backend Server

```
git clone https://github.com/mahdijihad001/TourManagementServer.git

```

## Setup env Variables

```

PORT=3500
MONGO_URI=your MongoDb Url
# Devlopment Environment
NODE_ENVIRONMENT=development
# Jwt Secrate
ACCESS_SECRATE=583360c83f3bbdc118bd00ffccf0b71c6bcb66a02c72b648de4d6933ca726c2250e945176b5c435b7e2da3a2e3569bae79d28d90eacc2607e19883f92d37d589
ACCESS_EXPIERS=1D
REFRESH_SECRATE=refresh_secrate
REFRESH_EXPIRED=30d

# Admin Secrate
SUPER_ADMIN_EMAIL=superadmin@gmail.com
SUPER_ADMIN_PASSWORD=12345678

# google Authentication use Pasport.js
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:3500/api/v1/auth/google/collback


# express session secrate
EXPRESS_SESSION_SECRATE=express_secrate

# Frontend Url
FRONTEND_URL=http://localhost:5173

```
```
npm i

npm run dev

```


 
