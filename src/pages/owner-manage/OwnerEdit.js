import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import DatePicker from '../../components/Form/DatePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, Select, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import DateRangePicker from '../../components/Form/DateRangePicker';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { amenitiesSchema, hotelSchema, registerOwnerSchema } from '../../services/validations';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import Compress from 'compress.js';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { kImageURL } from '../../services/constants';

function AddOwner() {
    const compress = new Compress();
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerOwnerSchema),
    });

    const onSubmit = async (formData) => {
        const { data, status } = id ? await axios.patch(`Author/update/${id}`, { ...formData, role: "Hotel" }) : await axios.post("Author/create", { ...formData, password: "string", role: "Hotel" });
        if (status == 200 || status == 201) {
            toast.success("User added successfully")
            navigate(-1)
        }
    };
    const getUserDetailsById = async (id) => {
        const { data, status } = await axios.get(`Author/view/${id}`);
        if (status == 200 || status == 201) {
            setValue("first_name",data?.first_name)
            setValue("last_name",data?.last_name)
            setValue("email",data?.email)
            setValue("phonenumber",data?.phonenumber)
        }
    }
    useEffect(() => {
        if(id){
            getUserDetailsById(id)
        }
    },[])

    return (
        <Layout title="Add Amenity" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">{id ? "Edit" : "Add"} Owner</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/owner-manage/owner-list">Owner</Link></li>
                                <li className="breadcrumb-item active">Add Owner</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>
            <Block>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className="g-gs">
                        <Col xxl="9">
                            <div className="gap gy-4">
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <Row className="g-gs">

                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">First name</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" {...register("first_name")} placeholder="First Name" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname1">Last name</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname1" {...register("last_name")} placeholder="Last Name" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                            <Row className="g-gs mt-2">

                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname3">Email</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname3" {...register("email")} placeholder="email" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname4">Phone number</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" id="productname4" {...register("phonenumber")} placeholder="Phone number" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                                

                                <div className="gap-col">
                                    <ul className="d-flex justify-content-end align-items-center gap g-3">
                                        <li>
                                            <Link to="/owner-manage/owner-list" className="btn border-0">Cancel</Link>
                                        </li>
                                        <li>
                                            <Button type="submit" variant="primary">Save Changes</Button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Block>
        </Layout>
    )
}

export default AddOwner;