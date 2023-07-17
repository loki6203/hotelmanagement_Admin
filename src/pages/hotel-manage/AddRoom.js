import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import { useEffect, useState } from 'react';
import axios from '../../services/axios';
import Compress from 'compress.js'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import Select from 'react-select';


function AddRoom() {
    const compress = new Compress();
    const navigate = useNavigate();
    const { id, roomId } = useParams();
    const [bedSize, setBedSize] = useState("")
    const [image, setImage] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(hotelSchema),
    });

    const onSubmit = async (formData) => {
        const { data, status } = roomId != undefined ? await axios.patch(`HotelRoom/update/${roomId}`, { ...formData }) : await axios.post('HotelRoom/create', { ...formData, hotel_id: id, status: "Active", no_of_rooms: parseInt(formData?.no_of_offline_rooms) + parseInt(formData?.no_of_online_rooms) });
        console.log(status)
        if (status == 200 || status == 201) {
            toast.success(roomId != undefined ? "Room updated successfully" : "Room added successfully")
            navigate(-1)
        }
    };

    const retreiveRooms = async () => {
        const { data, status } = await axios.get(`HotelRoom/view/${roomId}`);
        console.log(status)
        if (status == 200 || status == 201) {
            setValue("name", data?.name)
            setValue("no_of_rooms", data?.no_of_rooms)
            setValue("number_of_beds", data?.number_of_beds)
            setValue("max_adults", data?.max_adults)
            setValue("bed_size", data?.bed_size)
            setBedSize({value:data?.bed_size,label:data?.bed_size})
            setValue("no_of_online_rooms", data?.no_of_online_rooms)
            setValue("no_of_offline_rooms", data?.no_of_offline_rooms)
            setValue("max_children", data?.max_children)
            setValue("price", data?.price)
            setValue("room_size_in_sqft", data?.price)
            setValue("hotel_id", data?.hotel_id?._id)
            setValue("minimum_day_stay_requirements", data?.minimum_day_stay_requirements)
        }
    };
    useEffect(() => {
        if (roomId != undefined) {
            retreiveRooms();
        }
    }, [])
    return (
        <Layout title="Add Room" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Add Room</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to={`/hotel-manage/rooms-list/${id}`}>Rooms</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Room</li>
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
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Room Name</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" defaultValue="" {...register("name")} placeholder="Hotel Name" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Number of online rooms</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("no_of_online_rooms")} defaultValue="" placeholder="Enter Number of online rooms" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Number of offline rooms</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("no_of_offline_rooms")} defaultValue="" placeholder="Enter Number of offline rooms" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Number of beds</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("number_of_beds")} id="productname" defaultValue="" placeholder="Number of beds" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                   
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Bed size</Form.Label>
                                                        <div className="form-control-wrap">
                                                        <Select
                                                        name="colors"
                                                        value={bedSize}
                                                        options={[{ value: "Single", label: "Single" }, { value: "Double", label: "Double" }, { value: "Queen", label: "Queen" }, { value: "King", label: "King" }]}
                                                        className="basic-multi-select"
                                                        classNamePrefix="select"
                                                        placeholder="Select bed size"
                                                        onChange={(value) => {
                                                            setBedSize(value)
                                                            setValue("bed_size", value?.value)
                                                        }}
                                                    />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Max Adults</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("max_adults")} id="productname" defaultValue="" placeholder="Enter Max Adults" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Max Children</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("max_children")} id="productname" defaultValue="" placeholder="Enter Max Children" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Price</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("price")} defaultValue="" placeholder="Enter Price" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Minimum days stay requirement</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" defaultValue="" {...register("minimum_day_stay_requirements")} placeholder="Minimum day stay requirement" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Room size in sqft</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("room_size_in_sqft")} defaultValue="" placeholder="Room size in sqft" />
                                                        </div>
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
                                                        // props.values.img_sign = data[0].prefix + data[0].data;
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
                                </div>
                                <div className="gap-col">
                                    <ul className="d-flex justify-content-end align-items-center gap g-3">
                                        <li>
                                            <Link to={`/hotel-manage/rooms-list/${id}`} className="btn border-0">Cancel</Link>
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

export default AddRoom;