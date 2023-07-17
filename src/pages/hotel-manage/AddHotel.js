import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { hotelSchema } from '../../services/validations';
import { useEffect, useState } from 'react';
import axios from '../../services/axios';
import Select from 'react-select';
import Compress from 'compress.js'
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { kImageURL } from '../../services/constants';

function EditHotel() {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(hotelSchema),
    });
    const { id } = useParams();
    const compress = new Compress();
    const navigate = useNavigate();
    const [imagesList, setImagesList] = useState([]);
    const [hotelOwners, setHotelOwners] = useState(null);
    const [locationsList, setLocationsList] = useState(null);
    const [areasList, setAreasList] = useState(null);


    const [hotelSalesRepresentative, setHotelSalesRepresentative] = useState(null);
    const [salesRepresentativeList, setSalesRepresentativeList] = useState(null);
    const [status, setStatus] = useState(null);
    const [rating, setrating] = useState(null);
    const [hotelO, sethotelO] = useState(null);
    const [hotel1, sethotel1] = useState(null);
    const [hotel2, sethotel2] = useState(null);
    const [is_featured, setIs_Featured] = useState(false);
    const [amenities, setAmenities] = useState([]);
    const [services, setServices] = useState([]);
    const [propertyTypes, setPropertyTypes] = useState([]);


    const [bannerImage, setBannerImage] = useState(null);
    const [extra_prices, setExtra_prices] = useState([{
        "name": "",
        "price": 0,
        "type": "",
        "is_per_person": false
    }])
    const [buyer_prices, setBuyer_prices] = useState([{
        "name": "", "content": "", "price": 0, "price_is": "", "is_price_per_person": false
    }])
    const getAllHotelOwners = async () => {
        const { data, status } = await axios.get("Author/list?role=Hotel");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {

                final_data.push({
                    value: item?._id,
                    label: item?.first_name + ' ' + item?.last_name,
                })
            })
            setHotelOwners(final_data)
        }
    }
    const getAllLocations = async () => {
        const { data, status } = await axios.get("Location/list");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {

                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setLocationsList(final_data)
        }
    }

    const deleteExtraPrices = async (index, item) => {
        if (item?._id) {
            const { data, status } = await axios.delete(`HotelExtraPrices/delete/${item?._id}`);
            if (status === 200 || status === 204) {
                const final_extra = extra_prices.filter((_, i) => i != index);
                setExtra_prices([...final_extra])
                toast.success("Extra price deleted successfully")
            }
        }else{
            const final_extra = extra_prices.filter((_, i) => i != index);
            setExtra_prices([...final_extra])
        }
       
    }


    const deleteBuyerPrices = async (index,item) => {
        if (item?._id) {
            const { data, status } = await axios.delete(`HotelBuyerPrices/delete/${item?._id}`);
            if (status === 200 || status === 204) {
                const final_extra = buyer_prices.filter((_, i) => i != index);
                setBuyer_prices([...final_extra])
                toast.success("Buyer price deleted successfully")
            }
        }else{
            const final_extra = buyer_prices.filter((_, i) => i != index);
            setBuyer_prices([...final_extra])
        }
    }

    const getAllAreas = async () => {
        const { data, status } = await axios.get(`Areas/list?location_id=${hotel1?.value}`);
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setAreasList(final_data)
        }
    }

    const getHotelDetailsById = async (id) => {
        const { data, status } = await axios.get(`Hotel/view/${id}`);
        if (status == 200 || status == 201) {
            setValue("title", data?.title)
            setValue("content", data?.content)
            setStatus({ label: data?.status, value: data?.status })
            setrating({ label: data?.rating_standard, value: data?.rating_standard })
            setValue("status", data?.status)
            setValue("rating_standard", data?.rating_standard)
            setValue("author_id", data?.author_id)
            setValue("location_id", data?.location_id?._id)
            setValue("area_id", data?.area_id?._id)
            setValue("sub_admin_id", data?.sub_admin_id?._id)
            setValue("map_latitude", data?.map_latitude)
            setValue("map_longitude", data?.map_longitude)
            setValue("youtube_video_link", data?.youtube_video_link)
            setValue("selling_price", data?.selling_price)
            setValue("price", data?.price)
            setBannerImage(kImageURL + data?.banner_image)
            setExtra_prices([...data?.HotelExtraPrices])
            setBuyer_prices([...data?.HotelBuyerPrices])
            setIs_Featured(data?.is_featured)
            setValue("is_featured", data?.is_featured)
            setHotelSalesRepresentative({ label: data?.sub_admin_id?.first_name + ' ' + data?.sub_admin_id?.last_name, value: data?.sub_admin_id?._id })
            let final_images = []
            data?.HotelGallery.map(item => {
                final_images?.push({ ...item, image: kImageURL + item?.image })
            })
            setImagesList([...final_images])
            let final_data = []
            let final_data_ids = []
            data?.amenities.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
                final_data_ids.push(item?._id)
            })
            setValue("amenities", final_data_ids)

            let final_services = []
            let final_services_ids = []
            data?.services.map((item) => {
                final_services.push({
                    value: item?._id,
                    label: item?.title,
                })
                final_services_ids.push(item?._id)
            })
            setValue("services", final_services_ids)
            let final_propertytypes = []
            let final_propertytypes_ids = []
            data?.propertytypes.map((item) => {
                final_propertytypes.push({
                    value: item?._id,
                    label: item?.title,
                })
                final_propertytypes_ids.push(item?._id)
            })
            setValue("services", final_propertytypes_ids)
            sethotelO({
                value: data?.author_id?._id,
                label: data?.author_id?.first_name + ' ' + data?.author_id?.last_name,
            })
            sethotel1({
                value: data?.location_id?._id,
                label: data?.location_id?.title,
            })
            sethotel2({
                value: data?.area_id?._id,
                label: data?.area_id?.title,
            })
            setValue("author_id", data?.author_id?._id)
            setAmenities(final_data)
            setServices(final_services)
            setPropertyTypes(final_propertytypes)
        }
    }

    const getAllUsers = async () => {
        const { data, status } = await axios.get(`Author/list?role=Subadmin`);
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.first_name + ' ' + item?.last_name,
                })
            })
            setSalesRepresentativeList([...final_data])
        }
    }
    useEffect(() => {
        getAllUsers();
    }, [])
    useEffect(() => {
        if (id) {
            getHotelDetailsById(id)
        }
    }, [])
    useEffect(() => {
        getAllLocations()
        getAllHotelOwners();
    }, [])
    useEffect(() => {
        if (hotel1) {
            getAllAreas()
        }
    }, [hotel1])
    const deleteImage = async (image, index) => {
        if (id) {
            if (image?._id) {
                const { data, status } = await axios.delete(`HotelGallery/delete/${image?._id}`);
                if (status === 200 || status === 204) {
                    const tempList = imagesList.filter(item => item._id != image._id)
                    setImagesList([...tempList])
                    toast.success("Image deleted successfully")
                }
            }
            else {
                const tempList = imagesList.filter((item, position) => position != index)
                setImagesList([...tempList])
            }
        } else {
            const tempList = imagesList.filter((item, position) => position != index)
            console.log(tempList, "tempList");
            setImagesList([...tempList])
        }
    }

    const onSubmit = async (formData) => {
        let images_data = [];
        if (id) {
            imagesList.map((item) => {
                if (item._id) {

                } else {
                    images_data.push(item)
                }
            })
        }
        const { data, status } = id ? await axios.patch(`Hotel/update/${id}`, { ...formData, galleries: images_data, extraprices: [...extra_prices], buyerprices: [...buyer_prices] }) : await axios.post('Hotel/create', { ...formData, extraprices: [...extra_prices], buyerprices: [...buyer_prices] });
        console.log(status)
        if (status == 200 || status == 201) {
            toast.success("Hotel added successfully")
            navigate(-1)
        }
    };
    const [owners, setOwners] = useState(null);
    const [servicesList, setServicesList] = useState(null);
    const [propertyTypesList, setPropertyTypesList] = useState(null);

    const [locations, setLocations] = useState([]);


    const getAllAminitiesList = async () => {
        const { data, status } = await axios.get("Amenties/list");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setOwners(final_data)
        }
    }

    const getAllLocationsList = async () => {
        const { data, status } = await axios.get("Services/list");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setServicesList(final_data)
        }
    }
    const getAllPropertyTypesList = async () => {
        const { data, status } = await axios.get("PropertyType/list");
        if (status === 200 || status === 201) {
            let final_data = []
            data?.results.map((item) => {
                final_data.push({
                    value: item?._id,
                    label: item?.title,
                })
            })
            setPropertyTypesList(final_data)
        }
    }

    useEffect(() => {
        getAllAminitiesList();
        getAllPropertyTypesList()
        getAllLocationsList();
    }, [])

    return (
        <Layout title="Add Hotel" content="container">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Block.Head>
                    <Block.HeadBetween>
                        <Block.HeadContent>
                            <Block.Title tag="h2">{id ? "Edit" : "Add"} Hotel</Block.Title>
                            <nav>
                                <ol className="breadcrumb breadcrumb-arrow mb-0">
                                    <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                                    <li className="breadcrumb-item"><Link to="/hotel-manage/hotels">Hotels</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">{id ? "Edit" : "Add"} Hotel</li>
                                </ol>
                            </nav>
                        </Block.HeadContent>
                        <Block.HeadContent>
                            <ul className="d-flex">
                                {id && <li>
                                    <Link to={`/hotel-manage/rooms-list/${id}`} className="btn btn-primary d-none d-md-inline-flex">
                                        <span>Manage Rooms</span>
                                    </Link>
                                </li>}
                            </ul>
                        </Block.HeadContent>
                    </Block.HeadBetween>
                </Block.Head>
                <Block>
                    <Row className="g-gs">
                        <Col xxl="9">
                            <div className="gap gy-4">
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <Row className="g-gs">
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label htmlFor="productname">Title</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" id="productname" {...register("title")} placeholder="Hotel Name" />
                                                            <span className="error-message">{errors?.title?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Description</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control as="textarea" rows={3} {...register("content")} />
                                                            <span className="error-message">{errors?.content?.message}</span>
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
                                            <label>Banner Image</label>
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
                                                        setValue("banner_image", data[0].prefix + data[0].data)
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
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <label>Gallery Images</label>
                                            <ul className="d-flex flex-wrap gap g-3 pb-3">
                                                {imagesList?.length > 0 ?
                                                    imagesList.map((item, index) => {
                                                        return <li onClick={() => { deleteImage(item, index) }}>
                                                            <Media size="huge icon-append">
                                                                <Image src={item?.image} alt="media" thumbnail />
                                                                <span className="icon-appended-close"><em class="icon ni ni-cross-circle-fill"></em></span>
                                                            </Media>
                                                        </li>
                                                    })
                                                    :

                                                    <li>
                                                        <Media size="huge icon-append">
                                                            <Image src="/images/product/a.jpg" alt="media" thumbnail />
                                                        </Media>
                                                    </li>
                                                }
                                            </ul>
                                            <div className="upload-button-custom">
                                                <input id="upload2" type={'file'} onChange={(e) => {
                                                    const files = [...e.target.files]
                                                    compress.compress(files, {
                                                        size: 1,
                                                        quality: .65,
                                                        maxWidth: 1920,
                                                        maxHeight: 1920,
                                                        resize: true,
                                                        rotate: false,
                                                    }).then((data) => {
                                                        setValue("galleries", [...imagesList, { image: data[0].prefix + data[0].data }])
                                                        setImagesList([...imagesList, { image: data[0].prefix + data[0].data }])
                                                    })
                                                }} />
                                                <label for="upload2">
                                                    <Icon name="img-fill"></Icon>
                                                    <p className="small">Upload your image here</p>
                                                    <span className="btn btn-primary btn-md">Upload</span>
                                                </label>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            {extra_prices?.map((item, index) => {
                                                return <>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <label>Extra prices ({item?.name})</label>

                                                        { <span className="icon-appended-close2" onClick={() => { deleteExtraPrices(index, item) }}><em class="icon ni ni-cross-circle-fill"></em></span>}
                                                    </div>
                                                    <Row className="g-gs" style={{ marginBottom: '25px', marginTop: 0 }}>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label htmlFor="productname">name</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Control type="text" value={extra_prices[index].name} id="productname" onChange={(evt) => {
                                                                        let tempPrices = [...extra_prices]
                                                                        tempPrices[index].name = evt.target.value
                                                                        setExtra_prices([...tempPrices])
                                                                    }} placeholder="Name" />

                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Price</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Control type="number" value={extra_prices[index].price} id="productname" onChange={(evt) => {
                                                                        let tempPrices = [...extra_prices]
                                                                        tempPrices[index].price = evt.target.value
                                                                        setExtra_prices([...tempPrices])
                                                                    }} placeholder="price" />

                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Type</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Select
                                                                        name="colors"
                                                                        value={{ value: extra_prices[index].type, label: extra_prices[index].type }}
                                                                        options={[{ value: "One Time", label: "One Time" }, { value: "Per Day", label: "Per Day" }]}
                                                                        className="basic-multi-select"
                                                                        classNamePrefix="select"
                                                                        placeholder="Select price is..."
                                                                        onChange={(value) => {
                                                                            let tempPrices = [...extra_prices]
                                                                            tempPrices[index].type = value?.value
                                                                            setExtra_prices([...tempPrices])

                                                                        }}
                                                                    />
                                                                    {/* <Form.Control type="text" id="productname" value={extra_prices[index].type} onChange={(evt) => {
                                                                        let tempPrices = [...extra_prices]
                                                                        tempPrices[index].type = evt.target.value
                                                                        setExtra_prices([...tempPrices])
                                                                    }} placeholder="One Time OR Per Day" /> */}
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm="12" lg="12">
                                                            <Form.Check type="checkbox" id="hotel-featured" label="Is Per Person" checked={extra_prices[index].is_per_person} onChange={(evt) => {
                                                                let tempPrices = [...extra_prices]
                                                                tempPrices[index].is_per_person = evt.target.checked
                                                                setExtra_prices([...tempPrices])
                                                            }} />
                                                        </Col>

                                                    </Row>
                                                </>
                                            })}
                                            <span className="btn btn-primary btn-md float-end" onClick={() => {
                                                let tempPrices = [...extra_prices]
                                                tempPrices.push({
                                                    "name": "",
                                                    "price": 0,
                                                    "type": "",
                                                    "is_per_person": false
                                                })
                                                setExtra_prices([...tempPrices])
                                            }}>Add another +</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>

                                            {buyer_prices?.map((item, index) => {
                                                return <>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                        <label>Buyer prices ({item?.name})</label>

                                                        { <span className="icon-appended-close2" onClick={() => { deleteBuyerPrices(index,item) }}><em class="icon ni ni-cross-circle-fill"></em></span>}
                                                    </div>

                                                    <Row className="g-gs" style={{ marginBottom: '25px', marginTop: 0 }}>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label htmlFor="productname">name</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Control type="text" value={buyer_prices[index].name} id="productname" onChange={(evt) => {
                                                                        let tempPrices = [...buyer_prices]
                                                                        tempPrices[index].name = evt.target.value
                                                                        setBuyer_prices([...tempPrices])
                                                                    }} placeholder="Name" />

                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label htmlFor="productname">Content</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Control type="text" value={buyer_prices[index].content} id="productname" onChange={(evt) => {
                                                                        let tempPrices = [...buyer_prices]
                                                                        tempPrices[index].content = evt.target.value
                                                                        setBuyer_prices([...tempPrices])
                                                                    }} placeholder="Content" />

                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Price</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    <Form.Control type="number" value={buyer_prices[index].price} id="productname" onChange={(evt) => {
                                                                        let tempPrices = [...buyer_prices]
                                                                        tempPrices[index].price = evt.target.value
                                                                        setBuyer_prices([...tempPrices])
                                                                    }} placeholder="price" />

                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col lg="12">
                                                            <Form.Group className="form-group">
                                                                <Form.Label>Price Is</Form.Label>
                                                                <div className="form-control-wrap">
                                                                    {console.log(buyer_prices[index].price_is)}
                                                                    <Select
                                                                        name="colors"
                                                                        value={{ value: buyer_prices[index].price_is, label: buyer_prices[index].price_is }}
                                                                        options={[{ value: "Fixed", label: "Fixed" }, { value: "Percent", label: "Percent" }]}
                                                                        className="basic-multi-select"
                                                                        classNamePrefix="select"
                                                                        placeholder="Select price is..."
                                                                        onChange={(value) => {
                                                                            let tempPrices = [...buyer_prices]
                                                                            tempPrices[index].price_is = value?.value
                                                                            setBuyer_prices([...tempPrices])
                                                                        }}
                                                                    />
                                                                    {/* <Form.Control type="text" id="productname" value={buyer_prices[index].type} onChange={(evt) => {
                                                                        let tempPrices = [...buyer_prices]
                                                                        tempPrices[index].price_is = evt.target.value
                                                                        setBuyer_prices([...tempPrices])
                                                                    }} placeholder="Fixed OR Percent" /> */}
                                                                </div>
                                                            </Form.Group>
                                                        </Col>
                                                        <Col sm="12" lg="12">
                                                            <Form.Check type="checkbox" id="hotel-featured" label="Is price per person" checked={buyer_prices[index].is_price_per_person} onChange={(evt) => {
                                                                let tempPrices = [...buyer_prices]
                                                                tempPrices[index].is_price_per_person = evt.target.checked
                                                                setBuyer_prices([...tempPrices])
                                                            }} />
                                                        </Col>

                                                    </Row>
                                                </>
                                            })}
                                            <span className="btn btn-primary btn-md float-end" onClick={() => {
                                                let tempPrices = [...buyer_prices]
                                                tempPrices.push({
                                                    "name": "", "content": "", "price": 0, "price_is": "", "is_price_per_person": false
                                                })
                                                setBuyer_prices([...tempPrices])
                                            }}>Add another +</span>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="gap-col">
                                    <Card className="card-gutter-md">
                                        <Card.Body>
                                            <Row className="g-gs">
                                                <Col sm="12" lg="12">
                                                    <Form.Check type="checkbox" id="hotel-featured" checked={is_featured} label="Is Featured" onChange={(evt) => {
                                                        setValue("is_featured", evt?.target.checked)
                                                        setIs_Featured(evt?.target.checked)
                                                    }} />
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Status</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                name="colors"
                                                                value={status}
                                                                options={[{ value: "Pending", label: "Pending" }, { value: "Suspended", label: "Suspended" }, { value: "Live", label: "Live" }]}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select status..."
                                                                onChange={(value) => {
                                                                    setValue("status", value?.value);
                                                                    setStatus(value)
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="error-message">{errors?.status?.message}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Rating</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={rating}
                                                                onChange={(value) => {
                                                                    setValue("rating_standard", value?.value);
                                                                    setrating(value)
                                                                }}
                                                                name="colors"
                                                                options={[{ value: "1", label: "1" }, { value: "2", label: "2" }, { value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }]}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select rating..."
                                                            />
                                                        </div>
                                                        <span className="error-message">{errors?.rating_standard?.message}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Youtube Link</Form.Label>
                                                        <div className="form-control-wrap">

                                                            <Form.Control type="text" {...register("youtube_video_link")} />
                                                            <span className="error-message">{errors?.youtube_video_link?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Latitude</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" {...register("map_latitude")} />
                                                            <span className="error-message">{errors?.map_latitude?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Longitude</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" {...register("map_longitude")} />
                                                            <span className="error-message">{errors?.map_longitude?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Selling price</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" {...register("selling_price")} />
                                                            <span className="error-message">{errors?.selling_price?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col lg="12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Price</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Form.Control type="text" {...register("price")} />
                                                            <span className="error-message">{errors?.price?.message}</span>
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                {/* <Col sm="12" lg="12">
                                                    <Form.Check type="checkbox" id="hotel-featured" label="Is Featured"/>
                                                </Col> */}
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Amenities</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                isMulti
                                                                value={amenities}
                                                                onChange={(value) => {
                                                                    console.log(value)
                                                                    let final_list = [];
                                                                    value?.map(item => {
                                                                        final_list.push(item?.value)
                                                                    })
                                                                    setValue("amenities", final_list);
                                                                    setAmenities(value)
                                                                }}
                                                                name="colors"
                                                                options={owners ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select amenities..."
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Services</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                isMulti
                                                                value={services}
                                                                onChange={(value) => {
                                                                    console.log(value)
                                                                    let final_list = [];
                                                                    value?.map(item => {
                                                                        final_list.push(item?.value)
                                                                    })
                                                                    setValue("services", final_list);
                                                                    setServices(value)
                                                                }}
                                                                name="colors"
                                                                options={servicesList ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select services..."
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Property Type</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                isMulti
                                                                value={propertyTypes}
                                                                onChange={(value) => {
                                                                    let final_list = [];
                                                                    value?.map(item => {
                                                                        final_list.push(item?.value)
                                                                    })
                                                                    setValue("propertytypes", final_list);
                                                                    setPropertyTypes(value)
                                                                }}
                                                                name="colors"
                                                                options={propertyTypesList ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select property types..."
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Hotel owner</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select

                                                                value={hotelO}
                                                                onChange={(value) => {
                                                                    setValue("author_id", value?.value);
                                                                    sethotelO(value)
                                                                }}
                                                                name="colors"
                                                                options={hotelOwners ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select owner..."
                                                            />
                                                        </div>
                                                        <span className="error-message">{errors?.author_id?.message}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Location</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={hotel1}
                                                                onChange={(value) => {
                                                                    setValue("location_id", value?.value);
                                                                    sethotel1(value)
                                                                    setValue("area_id", null);
                                                                    sethotel2(null)
                                                                }}
                                                                name="colors"
                                                                options={locationsList ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select location..."
                                                            />
                                                        </div>
                                                        <span className="error-message">{errors?.author_id?.message}</span>
                                                    </Form.Group>
                                                </Col>
                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Area</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={hotel2}
                                                                onChange={(value) => {
                                                                    setValue("area_id", value?.value);
                                                                    sethotel2(value)
                                                                }}
                                                                name="colors"
                                                                options={areasList ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select area..."
                                                            />
                                                        </div>
                                                        <span className="error-message">{errors?.author_id?.message}</span>
                                                    </Form.Group>
                                                </Col>

                                                <Col className="col-12">
                                                    <Form.Group className="form-group">
                                                        <Form.Label>Sales representative</Form.Label>
                                                        <div className="form-control-wrap">
                                                            <Select
                                                                value={hotelSalesRepresentative}
                                                                onChange={(value) => {
                                                                    setValue("sub_admin_id", value?.value);
                                                                    setHotelSalesRepresentative(value)
                                                                }}
                                                                name="colors"
                                                                options={salesRepresentativeList ?? []}
                                                                className="basic-multi-select"
                                                                classNamePrefix="select"
                                                                placeholder="Select sales representative..."
                                                            />
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
                                            <Link to="/hotel-manage/hotels">
                                                <span className="btn border-0">Cancel</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <Button type="submit" variant="primary">Save Changes</Button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Block>
            </Form>
        </Layout>
    )
}

export default EditHotel;