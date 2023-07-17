import React from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Layout from '../../layout/fullpage';
import axios from '../../services/axios';
import { Media, MediaGroup, Image, OverlineTitle, Logo } from '../../components';
import { loginSchema } from '../../services/validations';
import { setCookie } from '../../services/cookieHandling';

const AuthLoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });
    const navigate = useNavigate();
    const onSubmit = async (formData) => {
        const { data, status } = await axios.post("Author/login", { ...formData });
        if (status === 200 || status === 201) {
            setCookie("token", data?.Token)
            setCookie("role",data?.results?.role)
            setCookie("author_id",data?.results?._id)
            navigate("/home");
        }
    };

    return (
        <>
            <Layout title="Login" centered>
                <div className="container p-2 p-sm-4">
                    <Card className="overflow-hidden card-gutter-lg rounded-4 card-auth card-auth-mh">
                        <Row className="g-0 flex-lg-row-reverse">
                            <Col lg="5">
                                <Card.Body className="h-100 d-flex flex-column justify-content-center">
                                    <div className="nk-block-head text-center">
                                        <div className="nk-block-head-content">
                                            <h3 className="nk-block-title mb-1">Login to Account</h3>
                                            <p className="small">Please sign-in to your account</p>
                                        </div>
                                    </div>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row className="gy-3">
                                            <Col className="col-12">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="email">Email</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <Form.Control type="text" id="email" placeholder="Enter email" {...register("email")} required />
                                                        <span className="error-message">{errors?.email?.message}</span>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            <Col className="col-12">
                                                <Form.Group className="form-group">
                                                    <Form.Label htmlFor="password">Password</Form.Label>
                                                    <div className="form-control-wrap">
                                                        <Form.Control type="password" id="password" placeholder="Enter password" {...register("password")} required />
                                                        <span className="error-message">{errors?.password?.message}</span>
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                            {/* <Col className="col-12">
                                                <div className="d-flex flex-wrap justify-content-between">
                                                    <Form.Check
                                                        className="form-check-sm"
                                                        type="checkbox"
                                                        id="rememberMe"
                                                        label="Remember Me"
                                                    />
                                                    <Link to="/auths/auth-reset" className="small">Forgot Password?</Link>
                                                </div>
                                            </Col> */}
                                            <Col className="col-12 mt-5">
                                                <div className="d-grid">
                                                    <Button type="submit">Login to account</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Col>
                            <Col lg="7">
                                <Card.Body className="bg-dark is-theme has-mask has-mask-1 h-100 d-flex flex-column justify-content-end">
                                    <div className="mask mask-1"></div>
                                    <div className="brand-logo">
                                        <Logo />
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-11">
                                            <div className="mt-4">
                                                <div className="h1 title mb-3">Welcome back to <br /> Hotel management</div>
                                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Layout>
        </>
    )
}

export default AuthLoginPage;
