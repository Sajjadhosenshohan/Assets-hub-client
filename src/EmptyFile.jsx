import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleButton from "../../components/buttons/GoogleButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/default-input/DefaultInput";
import DefaultLabel from "../../components/default-label/DefaultLabel";
import SectionTitle from "../../components/section-title/SectionTitle";
import Title from "../../components/title/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function Login() {
    const { signIn, setUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then((result) => {
                setUser(result.user);
                e.target.reset();
                Swal.fire({
                    icon: "success",
                    title: "Logged In!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message
                    .split("/")[1]
                    .replace(/\)\./g, "")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                Swal.fire({
                    icon: "error",
                    title: `${errorMessage}`,
                });
            });
    };

    const handleCreateUserByGoogle = (event) => {
        event.preventDefault();
        signInWithGoogle()
            .then((result) => {
                const usersInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    profile_image: result.user?.photoURL,
                    role: "employee",
                };
                axiosPublic.post("/users", usersInfo).then((response) => {
                    console.log(response.data);
                    setUser(result.user);
                    Swal.fire({
                        icon: "success",
                        title: "Employee Logged In!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                });
            })
            .catch((error) => {
                const errorMessage = error.message
                    .split("/")[1]
                    .replace(/\)\./g, "")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                Swal.fire({
                    icon: "error",
                    title: `${errorMessage}`,
                });
            });
    };

    return (
        <section className="template-container py-6 min-h-[70vh] flex items-center">
            <Title title={"LogIn"} />
            <div className="mx-auto text-center w-full lg:w-2/3">
                <div>
                    <SectionTitle sectionTitle={"Login"} />
                    <form onSubmit={handleLogin}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <DefaultLabel labelName={"Email"} />
                                <DefaultInput
                                    inputType={"email"}
                                    inputName={"email"}
                                    inputPlaceholder={"Email"}
                                />
                            </div>
                            <div>
                                <DefaultLabel labelName={"Password"} />
                                <DefaultInput
                                    inputType={"password"}
                                    inputName={"password"}
                                    inputPlaceholder={"Password"}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-3 flex-wrap">
                            <PrimaryButton
                                buttonType={"submit"}
                                buttonName={"Login"}
                                buttonTextColor={"text-white"}
                                buttonBGColor={"bg-green-700"}
                            />
                        </div>
                    </form>
                    <p className="text-lg text-center my-4">OR</p>
                    <span onClick={handleCreateUserByGoogle}>
                        <GoogleButton />
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Login;
Join as asmin -
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/default-input/DefaultInput";
import DefaultLabel from "../../components/default-label/DefaultLabel";
import SectionTitle from "../../components/section-title/SectionTitle";
import Title from "../../components/title/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function JoinAsHR() {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { createUser, setUser, updateUserProfile } = useAuth();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;
        let company_name = form.company_name.value;
        const packages = form.packages.value;
        const image = form.image.files[0];
        const formData = new FormData();
        formData.append("image", image);

        // Validation
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 6 Characters",
            });
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Uppercase Character",
            });
            return;
        } else if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Lowercase Character",
            });
            return;
        }
        company_name = company_name.toLowerCase();
        try {
            const { data } = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGEBB_API
                }`,
                formData
            );
            const usersInfo = {
                name: name,
                email: email,
                password: password,
                company_logo: data.data.display_url,
                dob: dob,
                company_name: company_name,
                packages: packages,
                role: "hr",
            };
            const { data: users } = await axiosPublic.post("/users", usersInfo);
            if (users.insertedId) {
                await createUser(email, password);
                await updateUserProfile(name);
                setUser((prevUser) => {
                    return { ...prevUser, displayName: name };
                });
                Swal.fire({
                    icon: "success",
                    title: "HR Created!",
                    showConfirmButton: false,
                    timer: 1500,
                });
                navigate("/payment");
            } else {
                Swal.fire({
                    icon: "error",
                    title: users.message,
                });
            }
        } catch (error) {
            const errorMessage = error.message
                .split("/")[1]
                .replace(/\)\./g, "")
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase());
            Swal.fire({
                icon: "error",
                title: `${errorMessage}`,
            });
        }
    };

    return (
        <>
            <Title title={"Join As HR Manager"} />
            <section className="template-container py-6">
                <div className="mx-auto text-center w-full lg:w-2/3">
                    <div>
                        <SectionTitle sectionTitle={"Join As HR Manager"} />
                        <form onSubmit={handleCreateUser}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                <div>
                                    <DefaultLabel labelName={"Full Name"} />
                                    <DefaultInput
                                        inputType={"text"}
                                        inputName={"name"}
                                        inputPlaceholder={"Full Name"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Company Name"} />
                                    <DefaultInput
                                        inputType={"text"}
                                        inputName={"company_name"}
                                        inputPlaceholder={"Company Name"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Company Logo"} />
                                    <label className="block">
                                        <span className="sr-only">Choose profile photo</span>
                                        <input
                                            required
                                            type="file"
                                            name="image"
                                            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                        />
                                    </label>
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Email"} />
                                    <DefaultInput
                                        inputType={"email"}
                                        inputName={"email"}
                                        inputPlaceholder={"Email"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Password"} />
                                    <DefaultInput
                                        inputType={"password"}
                                        inputName={"password"}
                                        inputPlaceholder={"Password"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Data Of Birth"} />
                                    <DefaultInput inputType={"date"} inputName={"dob"} />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Select A Package"} />
                                    <select
                                        required
                                        className="w-full border border-gray-300 p-3 rounded-md text-base font-normal"
                                        name="packages"
                                    >
                                        <option value="" selected disabled>
                                            Chose Any Of 3
                                        </option>
                                        <option value="basic">5 Members for $5</option>
                                        <option value="standard">10 Members for $8</option>
                                        <option value="premium">20 Members for $15</option>
                                    </select>
                                </div>
                            </div>
                            <PrimaryButton
                                buttonType={"submit"}
                                buttonName={"SignUp"}
                                buttonTextColor={"text-white"}
                                buttonBGColor={"bg-green-700"}
                            />
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}

export default JoinAsHR;

Employee -
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleButton from "../../components/buttons/GoogleButton";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import DefaultInput from "../../components/default-input/DefaultInput";
import DefaultLabel from "../../components/default-label/DefaultLabel";
import SectionTitle from "../../components/section-title/SectionTitle";
import Title from "../../components/title/Title";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

function JoinAsEmployee() {
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const { createUser, setUser, signInWithGoogle } = useAuth();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const dob = form.dob.value;

        // Validation
        if (password.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 6 Characters",
            });
            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Uppercase Character",
            });
            return;
        } else if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Please Enter A Password Of At Least 1 Lowercase Character",
            });
            return;
        }

        try {
            const usersInfo = {
                name: name,
                email: email,
                dob: dob,
                role: "employee",
            };

            const response = await axiosPublic.post("/users", usersInfo);
            console.log(response);
            const result = await createUser(email, password);
            await updateProfile(result.user, {
                displayName: name,
            });
            setUser((prevUser) => {
                return { ...prevUser, displayName: name };
            });
            Swal.fire({
                icon: "success",
                title: "Employee Created!",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/");
        } catch (error) {
            const errorMessage =
                error.response?.data.message ||
                error.message
                    .split("/")[1]
                    .replace(/\)\./g, "")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
            Swal.fire({
                icon: "error",
                title: `${errorMessage}`,
            });
        }
    };

    const handleCreateUserByGoogle = (event) => {
        event.preventDefault();
        signInWithGoogle()
            .then((result) => {
                const usersInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    profile_image: result.user?.photoURL,
                    role: "employee",
                };
                axiosPublic.post("/users", usersInfo).then((response) => {
                    console.log(response.data);
                    setUser(result.user);
                    Swal.fire({
                        icon: "success",
                        title: "Employee Created!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/");
                });
            })
            .catch((error) => {
                const errorMessage = error.message
                    .split("/")[1]
                    .replace(/\)\./g, "")
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                Swal.fire({
                    icon: "error",
                    title: `${errorMessage}`,
                });
            });
    };

    return (
        <>
            <Title title={"Join As Employee"} />
            <section className="template-container py-6">
                <div className="mx-auto text-center w-full lg:w-2/3">
                    <div>
                        <SectionTitle sectionTitle={"Join As Employee"} />
                        <form onSubmit={handleCreateUser}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <DefaultLabel labelName={"Full Name"} />
                                    <DefaultInput
                                        inputType={"text"}
                                        inputName={"name"}
                                        inputPlaceholder={"Full Name"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Email"} />
                                    <DefaultInput
                                        inputType={"email"}
                                        inputName={"email"}
                                        inputPlaceholder={"Email"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Password"} />
                                    <DefaultInput
                                        inputType={"password"}
                                        inputName={"password"}
                                        inputPlaceholder={"Password"}
                                    />
                                </div>
                                <div>
                                    <DefaultLabel labelName={"Data Of Birth"} />
                                    <DefaultInput inputType={"date"} inputName={"dob"} />
                                </div>
                            </div>
                            <div className="flex justify-center items-center gap-3 flex-wrap">
                                <PrimaryButton
                                    buttonType={"submit"}
                                    buttonName={"SignUp"}
                                    buttonTextColor={"text-white"}
                                    buttonBGColor={"bg-green-700"}
                                />
                            </div>
                        </form>
                        <p className="my-4 text-center text-lg">OR</p>
                        <span onClick={handleCreateUserByGoogle}>
                            <GoogleButton />
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

export default JoinAsEmployee;



import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

function useAxiosSecure() {
    const navigate = useNavigate();
    const { logOut } = useAuth();

    axiosSecure.interceptors.request.use(
        function (config) {
            const token = localStorage.getItem("access-token");
            //   console.log("interceptor", token);
            config.headers.authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            return Promise.reject(error);
        }
    );

    axiosSecure.interceptors.response.use(
        function (response) {
            return response;
        },
        async (error) => {
            const status = error.response.status;
            console.log("Status Error", status);
            await logOut();
            navigate("/login");
            return Promise.reject(error);
        }
    );

    return axiosSecure;
}

export default useAxiosSecure;

// server


import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

function useHR() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isHR, isPending: isHRLoading } = useQuery({
        queryKey: [user?.email, "hr"],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            return res.data?.hr;
        },
    });
    return { isHR, isHRLoading };

    server -
const express = require("express");
    const cors = require("cors");
    const jwt = require("jsonwebtoken");
    require("dotenv").config();
    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
    const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
    const app = express();
    const port = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    // MongoDB Starts Here
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rezh0z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    async function run() {
        try {
            // Collections
            const usersCollection = client.db("resquareITDB").collection("users");
            const paymentCollection = client.db("resquareITDB").collection("payments");
            const assetsCollection = client.db("resquareITDB").collection("assets");

            // JWT
            app.post("/jwt", async (request, response) => {
                const user = request.body;
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: "365d",
                });
                response.send({ token });
            });

            // Verify Token
            const verifyToken = (request, response, next) => {
                // console.log("vToken", request.headers.authorization);
                if (!request.headers.authorization) {
                    return response.status(401).send({ message: "forbidden access" });
                }
                const token = request.headers.authorization.split(" ")[1];
                jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        return response.status(401).send({ message: "forbidden access" });
                    }
                    request.decoded = decoded;
                    next();
                });
            };

            // Verify HR
            const verifyHR = async (request, response, next) => {
                const email = request.decoded.email;
                const query = { email: email };
                const user = await usersCollection.findOne(query);
                const isHR = user?.role === "hr";
                if (!isHR) {
                    return response.status(403).send({ message: "forbidden" });
                }
                next();
            };

            // Create User
            app.post("/users", async (request, response) => {
                const user = request.body;
                const emailQuery = { email: user.email };
                const companyQuery = { company_name: user.company_name };
                const role = user.role;

                const existingUser = await usersCollection.findOne(emailQuery);
                const existingCompany = await usersCollection.findOne(companyQuery);

                if (existingUser) {
                    return response.send({
                        message: "User Already Exists!",
                        insertedId: null,
                    });
                }

                if (role == "hr" && existingCompany) {
                    return response.send({
                        message: "Company Name Already Exists!",
                        insertedId: null,
                    });
                }

                const result = await usersCollection.insertOne(user);
                response.send(result);
            });

            // Get Users
            app.get("/users", async (request, response) => {
                const result = await usersCollection.find().toArray();
                response.send(result);
            });

            // HR User
            app.get("/users/hr/:email", verifyToken, async (request, response) => {
                const email = request.params.email;
                if (email !== request.decoded.email) {
                    return response.status(403).send({ message: "unauthorized" });
                }
                const query = { email: email };
                const user = await usersCollection.findOne(query);
                let hr = false;
                if (user) {
                    hr = user?.role === "hr";
                }
                response.send({ hr });
            });

            // Employee User
            app.get(
                "/users/employee/:email",
                verifyToken,
                async (request, response) => {
                    const email = request.params.email;
                    if (email !== request.decoded.email) {
                        return response.status(403).send({ message: "unauthorized" });
                    }
                    const query = { email: email };
                    const user = await usersCollection.findOne(query);
                    let employee = false;
                    if (user) {
                        employee = user?.role === "employee";
                    }
                    response.send({ employee });
                }
            );

            // Get An User Data
            app.get("/users/:email", async (req, res) => {
                const email = req.params.email;
                const query = { email: email };
                const user = await usersCollection.findOne(query);
                res.send(user);
            });

            // Update User Name
            app.patch("/users", verifyToken, async (req, res) => {
                const { email, name } = req.body;
                const filter = { email };
                const updateDoc = {
                    $set: {
                        name,
                    },
                };
                const result = await usersCollection.updateOne(filter, updateDoc);
                res.send(result);
            });

            // Add An User To the Company
            app.patch("/users/:id", verifyToken, async (req, res) => {
                const id = req.params.id;
                const { company_name, company_logo } = req.body;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $set: {
                        company_name,
                        company_logo,
                    },
                };
                const result = await usersCollection.updateOne(filter, updateDoc);
                res.send(result);
            });

            // Remove An User From the Company
            app.patch("/users/:id", verifyToken, async (req, res) => {
                const id = req.params.id;
                const filter = { _id: new ObjectId(id) };
                const updateDoc = {
                    $unset: {
                        company_name: "",
                        company_logo: "",
                    },
                };
                const result = await usersCollection.updateOne(filter, updateDoc);
                res.send(result);
            });

            // Get Users by Company Name
            app.get(
                "/users/company/:company_name",
                verifyToken,
                async (request, response) => {
                    const companyName = request.params.company_name;
                    const query = { company_name: companyName };
                    const users = await usersCollection.find(query).toArray();
                    response.send(users);
                }
            );

            // Add An Asset
            app.post("/assets", verifyToken, async (req, res) => {
                try {
                    const formData = req.body;
                    const { email, name, company_name } = req.decoded;
                    const createdAt = new Date();

                    const assetData = {
                        ...formData,
                        creator_name: name,
                        creator_email: email,
                        company_name,
                        createdAt,
                    };

                    const result = await assetsCollection.insertOne(assetData);
                    res.send(result);
                } catch (error) {
                    console.error(error);
                    res.status(500).send({ message: "Internal server error" });
                }
            });

            // Payment
            app.post("/create-payment-intent", async (req, res) => {
                const { price } = req.body;
                const amount = parseInt(price * 100);
                console.log(amount, "amount inside the intent");

                const paymentIntent = await stripe.paymentIntents.create({
                    amount: amount,
                    currency: "usd",
                    payment_method_types: ["card"],
                });

                res.send({
                    clientSecret: paymentIntent.client_secret,
                });
            });

            app.post("/payments", async (req, res) => {
                const payment = req.body;
                const paymentResult = await paymentCollection.insertOne(payment);
                res.send({ paymentResult });
            });

            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log(
                "Pinged your deployment. You successfully connected to MongoDB!"
            );
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    }
    run().catch(console.dir);
    // MongoDB Ends Here

    app.get("/", (req, res) => {
        res.send("Server is Running");
    });
    app.listen(port, () => {
        console.log(`Running Port is : ${port}`);
    });


}

export default useHR;
