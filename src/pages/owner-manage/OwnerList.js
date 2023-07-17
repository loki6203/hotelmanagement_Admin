import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import OwnerData, { ownerColumns } from '../../store/users/OwnerData';
import { registerOwnerSchema } from '../../services/validations';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

function OwnerListPage() {
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false);
    const [owners, setOwners] = useState(null);
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const getAllHotelOwners = async () => {
        const { data, status } = await axios.get("Author/list?role=Hotel");
        if (status === 200 || status === 201) {
            setOwners(data?.results)
        }
    }
    useEffect(() => {
        getAllHotelOwners();
    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerOwnerSchema),
    });


    const onSubmit = async (formData) => {
        console.log(formData)
        const { data, status } = await axios.post("Author/create",{...formData,password:"string",role:"User"});
        if(status == 201 || status == 200){
            toast.success("Owner added successfully")
            handleCloseModal();
        }
    };
    return (
        <Layout title="Owners List" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Hotel Owner List</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Owners</li>
                            </ol>
                        </nav>
                    </Block.HeadContent>
                    <Block.HeadContent>
                        <ul className="d-flex">
                            <li>
                                <Button className="d-md-none" size="md" variant="primary" onClick={() => {navigate("/owner-manage/owner-edit")}}>
                                    <Icon name="plus" />
                                    <span>Add</span>
                                </Button>
                            </li>
                            <li>
                                <Button className="d-none d-md-inline-flex" variant="primary" onClick={() => {navigate("/owner-manage/owner-edit")}}>
                                    <Icon name="plus" />
                                    <span>Add Owner</span>
                                </Button>
                            </li>
                        </ul>
                    </Block.HeadContent>
                </Block.HeadBetween>
            </Block.Head>
            <Block>
                <Card>
                    {owners != null ? <DataTable tableClassName="data-table-head-light table-responsive" data={owners} columns={ownerColumns} search={"first_name"} /> : null}
                </Card>
            </Block>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Owner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Row className="g-3">
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="firstname">First Name</Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Control id="firstname" type="text" placeholder="First name" {...register("first_name")} />
                                        <span className="error-message">{errors?.first_name?.message}</span>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="lastname">Last Name</Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Control id="lastname" type="text" placeholder="Last name" {...register("last_name")} />
                                        <span className="error-message">{errors?.last_name?.message}</span>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="email">Email Address</Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Control id="email" type="text" placeholder="Email address" {...register("email")} />
                                        <span className="error-message">{errors?.email?.message}</span>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Group className="form-group">
                                    <Form.Label htmlFor="phonenumber">Phone number</Form.Label>
                                    <div className="form-control-wrap">
                                        <Form.Control id="phonenumber" type="text" placeholder="Phone number" {...register("phonenumber")} />
                                        <span className="error-message">{errors?.phonenumber?.message}</span>
                                    </div>
                                </Form.Group>
                            </Col>
                            <Col lg="12">
                                <div className="d-flex gap g-2">
                                    <div className="gap-col">
                                        <Button variant="primary" type={"submit"}>Add User</Button>
                                    </div>
                                    <div className="gap-col">
                                        <button type="button" className="border-0 btn" onClick={handleCloseModal}>Discard</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>

        </Layout>
    )
}

export default OwnerListPage;