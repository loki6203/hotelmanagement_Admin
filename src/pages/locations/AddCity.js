import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axios from '../../services/axios';
import Select from 'react-select';
import Compress from 'compress.js'
import { toast } from 'react-toastify';


function AddCity() {

    
    const compress = new Compress();
    const navigate = useNavigate();
    const [imagesList, setImagesList] = useState([])
    const [cities, setCities] = useState(null);
    const [image, setImage] = useState(null)
    const getAllHotel = async () => {
        const { data, status } = await axios.get(("LocationStates/list"));
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setCities(final_data)
        }
    }
    useEffect(() => {
        getAllHotel();
    }, [])
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({

    });
    const onSubmit = async (formData) => {
        const { data, status } =  await axios.post(`Location/create/`, formData);
        if (status == 200 || status == 201) {
            toast.success("City added successfully")
            navigate(-1)
        }
    };

    
    return (
        <Layout title="Add Area" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Add City</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/location/city/">City</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Add City</li>
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
                                                        <Form.Label htmlFor="productname">City</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" defaultValue=""  {...register("title")} placeholder="Enter Area Name" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">State</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                name="colors"
                                                                options={cities}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select State..."
                                                                onChange={(value) => {
                                                                    setValue("location_state_id", value?.value)
                                                                }}
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Latitude</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" {...register("latitude")} defaultValue="" placeholder="Enter Latitude" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Longitude</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" {...register("longitude")} defaultValue="" placeholder="Enter Longitude" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12">
                                                    <Card className="card-gutter-md">
                                                        <Card.Body>
                                                            <ul className="d-flex flex-wrap gap g-3 pb-3">
                                                                <li>
                                                                    <Media size="huge icon-append">
                                                                        <Image src={image ?? "/images/product/a.jpg"} alt="media" thumbnail />
                                                                        <span className="icon-appended-close"><em class="icon ni ni-cross-circle-fill"></em></span>
                                                                    </Media>
                                                                </li>
                                                            </ul>
                                                            <div className="upload-button-custom">
                                                                <input id="upload" type={'file'} onChange={(e) => {
                                                                    const files = [...e.target.files]
                                                                    compress.compress(files, {
                                                                        size: 1,
                                                                        quality: .65,
                                                                        maxWidth: 1920,
                                                                        maxHeight: 1920,
                                                                        resize: true,
                                                                        rotate: false,
                                                                    }).then((data) => {
                                                                        setImage(data[0].prefix + data[0].data)
                                                                        setValue("icon", data[0].prefix + data[0].data)
                                                                    })
                                                                }} />
                                                                <label for="upload">
                                                                    <Icon name="img-fill"></Icon>
                                                                    <p className="small">Upload your image here</p>
                                                                    <span className="btn btn-primary btn-md">Upload</span>
                                                                </label>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col md="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="exampleFormControlTextarea8">Description</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control as="textarea" placeholder="Enter Description" {...register("description")} id="exampleFormControlTextarea8" rows="3"></Form.Control>
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
                                            <Link to="/location/city/" className="btn border-0">Cancel</Link>
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

export default AddCity;