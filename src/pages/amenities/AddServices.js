import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import DatePicker from '../../components/Form/DatePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import DateRangePicker from '../../components/Form/DateRangePicker';
import Select from 'react-select';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { amenitiesSchema, hotelSchema } from '../../services/validations';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import Compress from 'compress.js';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { kImageURL } from '../../services/constants';

function AddServices() {
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
        resolver: yupResolver(amenitiesSchema),
    });
    const [image, setImage] = useState(null)
    const [status, setStatus] = useState(null)
    const onSubmit = async (formData) => {
        const { data, status } = id ? await axios.patch(`Services/update/${id}`, image?.includes(kImageURL)?{
            title:formData.title,
            status:formData?.status,
        } :formData) : await axios.post('Services/create', formData);
        if (status == 200 || status == 201) {
            toast.success("Services added successfully")
            navigate(-1)
        }
    };
    const getAmentyDetailsById = async (id) => {
        const { data, status } = await axios.get(`Services/view/${id}`);
        if (status == 200 || status == 201) {
            setValue("title", data?.title)
            setValue("status", data?.status)
            setValue("icon", data?.icon)
            setStatus({ label: data?.status, value: data?.status })
            setImage(data?.icon ? kImageURL + data?.icon : null)
        }
    }
    useEffect(() => {
        if (id) {
            getAmentyDetailsById(id)
        }
    }, [])
    console.log(status)
    
    return (
        <Layout title="Add Amenity" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">{id ? "Edit" : "Add"} Service</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/services/all-services">Services</Link></li>
                                <li className="breadcrumb-item active" aria-current="/services/add-services">Add Service</li>
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
                                                        <Form.Label htmlFor="productname">Service Name</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" {...register("title")} placeholder="Service Name" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Status</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={status}
                                                                onChange={(value) => {
                                                                    setValue("status", value?.value);
                                                                    setStatus(value)
                                                                }}
                                                                name="colors"
                                                                options={[{ value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }]}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select status..."
                                                            />
                                                            {/* <Select name="status" defaultValue={status} setValue={setValue} value={status} {...register("status")}  removeItemButton  >
                                                        <option value="">Select an option</option>
                                                        <option value="Active">Active</option>
                                                        <option value="InActive">Inactive</option>
                                                    </Select> */}

                                                        </div>
                                                        <span className="error-message">{errors?.status?.message}</span>
                                                    </Form.Group>
                                                </Col>

                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <ul className="d-flex flex-wrap gap g-3 pb-3">
                                                <li>
                                                    <Media size="huge icon-append">
                                                        <Image src={image ?? "/images/product/a.jpg"} alt="media" thumbnail staticImage />
                                                        <span className="icon-appended-close" onClick={() => {setValue("icon",'');setImage(null)}}><em class="icon ni ni-cross-circle-fill"></em></span>
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
                                                        // props.values.img_sign = data[0].prefix + data[0].data;
                                                    })
                                                }} />
                                                <label for="upload">
                                                    <Icon name="img-fill"></Icon>
                                                    <p className="small">Upload your image here</p>
                                                    <span className="btn btn-primary btn-md">Upload</span>
                                                </label>
                                            </div>
                                            <span className="error-message">{errors?.icon?.message}</span>
                                        </Card.Body>
                                    </Card>
                                </div>

                                <div className="gap-col">
                                    <ul className="d-flex justify-content-end align-items-center gap g-3">
                                        <li>
                                            <Link to="/services/all-services" className="btn border-0">Cancel</Link>
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

export default AddServices;