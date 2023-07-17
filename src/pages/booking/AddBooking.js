import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import axios from '../../services/axios';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Compress from 'compress.js'
import { getCookie } from '../../services/cookieHandling';
function AddBooking() {
    const [selectHotel, setSelectHotel] = useState(null)
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        // resolver: yupResolver(hotelSchema),
    });
    const [property, setProperty] = useState(null);
    const [randomState, setRandomeState] = useState(0)
    const [hotels, setHotels] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const compress = new Compress();
    const getAllHotel = async () => {
        const { data, status } = await axios.get(getCookie("role") == "Hotel" ? `Hotel/list?author_id=${getCookie("author_id")}&status=Live` : "Hotel/list?status=Live");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setHotels(final_data)
        }
    }
    const getProperty = async () => {
        const { data, status } = await axios.get(
            `Hotel/view/${getValues().hotel_id}?checkin_at=${getValues().checkin_date}`,
        );
        if (status === 200 || status === 201) {
            setProperty(data?.HotelRooms);
        }
    };

    useEffect(() => {
        if(getValues()?.hotel_id){
            getProperty();
        }
        
    }, [
        getValues()?.hotel_id,
        getValues()?.checkin_date
    ]);
    useEffect(() => {
        getAllHotel();
    }, [])
    const onSubmit = async (formData) => {
        const sumRoomsNumber = formData?.room_ids.reduce(
            (accumulator, room) => accumulator + room.no_of_rooms,
            0,
          );
        const { data, status } = await axios.post('Booking/create',getCookie("role") == "Hotel" ? {...formData,no_of_rooms:sumRoomsNumber,payment_status:"Success",booking_status:"Confirmed",author_id:getCookie("author_id")}:  {...formData,payment_status:"Success",booking_status:"Confirmed",no_of_rooms:sumRoomsNumber});
        if (status == 200 || status == 201) {
            toast.success("Booking created successfully")
            navigate(-1)
        }
    };
    return (
        <Layout title="Add Booking" content="container">
            <Block.Head>
                <Block.HeadBetween>
                    <Block.HeadContent>
                        <Block.Title tag="h2">Add Booking</Block.Title>
                        <nav>
                            <ol className="breadcrumb breadcrumb-arrow mb-0">
                                <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/bookings/all-bookings">Bookings</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Add Booking</li>
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
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Hotel</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={selectHotel}
                                                                onChange={(value) => {
                                                                    setSelectHotel(value)
                                                                    setValue("hotel_id", value?.value)
                                                                }}
                                                                name="colors"
                                                                options={hotels ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select hotel..."
                                                            />
                                                        </div>

                                                    </Form.Group>
                                                </Col>
                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Checkin Date</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="date" onChange={(e) => {
                                                                setValue("checkin_date", e?.target?.value)
                                                                setRandomeState(randomState + 1)
                                                            }} id="productname" defaultValue="" placeholder="Coupon Amount" />
                                                        </div>

                                                    </Form.Group>
                                                </Col>
                                                <Col lg="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Checkout Date</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="date" onChange={(e) => {
                                                                setValue("checkout_date", e?.target?.value)
                                                                setRandomeState(randomState + 1)
                                                            }} id="productname" defaultValue="" placeholder="Coupon Amount" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                {
                                                    property?.map((item) => {
                                                        return <Col lg="6">
                                                            <Form.Group className="form-group">
                                                                <Form.Label htmlFor="productname">No of {item.name} Rooms</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Select id="exampleFormControlInputText5" onChange={(e) => {

                                                                        setValue("room_ids",getValues()?.room_ids ?  [...getValues()?.room_ids,{
                                                                            hotel_room_id: item._id,
                                                                            price: item.price,
                                                                            no_of_rooms: parseInt(e?.target?.value),
                                                                        }] : [{
                                                                            hotel_room_id: item._id,
                                                                            price: item.price,
                                                                            no_of_rooms: parseInt(e?.target?.value),
                                                                        }])
                                                                    }} aria-label="Default select example" >
                                                                        <option value="0">Select No of {item.name} Room</option>
                                                                        {
                                                                            Array(item?.no_of_rooms).fill(0).map((_, index) => {
                                                                                return <option value={index + 1}>{index + 1}</option>
                                                                            })
                                                                        }


                                                                    </Form.Select>
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                    })
                                                }
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Adults</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" id="productname" {...register("no_of_adults")} defaultValue="" placeholder="Enter Adults" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Children</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" id="productname" {...register("no_of_chlidrens")} defaultValue="" placeholder="Enter Children" />
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
                                            <Row className="g-gs">

                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Guest name</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" defaultValue="" {...register("author_name")} placeholder="Enter Guest name" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Phone</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" {...register("author_phonenumber")} defaultValue="" placeholder="Enter Phone" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Email</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="email" {...register("author_email")} defaultValue="" placeholder="Enter Email" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Address</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" {...register("address")} placeholder="Enter Address" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Instructions</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control as="textarea" defaultValue="" rows="3" {...register("instructions")} placeholder="Enter instructions" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="gap-col mt-5">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <Row className="g-gs">

                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Coupon code</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" defaultValue="" {...register("promocode")} placeholder="Enter Coupon" />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Total paid</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" defaultValue="" {...register("total_paid")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Total service price</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" defaultValue="" {...register("total_service_price")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Total extra price</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" defaultValue="" {...register("total_extra_price")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Discount</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="number" defaultValue="" {...register("discount")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Total paid</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" defaultValue="" {...register("total_paid")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>

                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Payment Method</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Select id="exampleFormControlInputText5" {...register("payment_method")} aria-label="Default select example">
                                                                <option value="0">Select Payment Method</option>
                                                                <option value="Offline">UPI</option>
                                                                <option value="Offline">Card</option>
                                                                <option value="Offline">Cash</option>
                                                            </Form.Select>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md="6">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname" >Gst No</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" defaultValue="" {...register("gst_no")} />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                    <div className="gap-col mt-5">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <label>Id Proof</label>
                                            <ul className="d-flex flex-wrap gap g-3 pb-3">
                                                {bannerImage ?
                                                    <li onClick={() => { setBannerImage(null) }}>
                                                        <Media size="huge icon-append">
                                                            <Image src={bannerImage} alt="media" thumbnail />
                                                            <span className="icon-appended-close"><em class="icon ni ni-cross-circle-fill"></em></span>
                                                        </Media>
                                                    </li>

                                                    :

                                                    <li>
                                                        <Media size="huge icon-append">
                                                            <Image src="/images/product/a.jpg" alt="media" thumbnail />
                                                        </Media>
                                                    </li>
                                                }
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
                                                        setValue("id_proof", data[0].prefix + data[0].data)
                                                        setBannerImage(data[0].prefix + data[0].data)
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
                                </div>
                                <div className="gap-col">
                                    <ul className="d-flex justify-content-end align-items-center gap g-3">
                                        <li>
                                            <Link to="/bookings/all-bookings" className="btn border-0">Cancel</Link>
                                        </li>
                                        <li>
                                            <Button type="submit" variant="primary">Book</Button>
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

export default AddBooking;