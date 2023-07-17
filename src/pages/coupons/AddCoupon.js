import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import TimePicker from '../../components/Form/TimePicker';
import DatePicker from '../../components/Form/DatePicker';
import Layout from '../../layout/default';
import OverlineTitle from '../../components/Text/Text';
import Block from '../../components/Block/Block';
import { Icon, Select, QuillMinimal, FileUpload, Tags, Image, Media, ImageUpload } from '../../components';
import DateRangePicker from '../../components/Form/DateRangePicker';
import Compress from 'compress.js';

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { amenitiesSchema, couponsSchema, hotelSchema } from '../../services/validations';
import axios from '../../services/axios';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { kImageURL } from '../../services/constants';
import moment from 'moment';


function AddCoupon() {
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
        resolver: yupResolver(couponsSchema),
    });
    const [image,setImage] = useState(null)
    const [status,setStatus] = useState(null)
    const onSubmit = async (formData) => {
        let final_payload = formData
        if(id && image?.includes(kImageURL)){
            delete final_payload.icon
        }
        const { data, status } = id ? await axios.patch(`Coupon/update/${id}`, final_payload):  await axios.post('Coupon/create', formData);
        if (status == 200 || status == 201) {
            toast.success("Coupon added successfully")
            navigate(-1)
        }
    };
    const getCouponDetailsById = async (id) => {
        const { data, status } = await axios.get(`Coupon/view/${id}`);
        if (status == 200 || status == 201) {
            setValue("name",data?.name)
            setValue("code",data?.code)
            setValue("icon",data?.icon)
            setValue("amount",data?.amount)
            setValue("status",data?.status)
            setValue("discount_type",data?.discount_type)
            setValue("endate",moment(data?.endate).format("YYYY-MM-DD"))
            setValue("startdate",moment(data?.startdate).format("YYYY-MM-DD"))
            setValue("minimumspend",data?.minimumspend)
            setValue("maximumspend",data?.maximumspend)
            setValue("usage_limit_per_coupon",data?.usage_limit_per_coupon)
            setValue("usage_limit_per_user",data?.usage_limit_per_user)
            setStatus(data?.status)
            setImage(data?.icon ? kImageURL + data?.icon : null)
        }
    }
    useEffect(() => {
        if(id){
            getCouponDetailsById(id)
        }
    },[])
console.log(errors)
  return (
    <Layout title="Add Coupons" content="container">
        <Block.Head>
            <Block.HeadBetween>
                <Block.HeadContent>
                    <Block.Title tag="h2">Add Coupon</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                          <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                          <li className="breadcrumb-item"><Link to="/coupon/all-coupons">Coupons</Link></li>
                          <li className="breadcrumb-item active" aria-current="page">Add Coupons</li>
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
                                            <OverlineTitle>General</OverlineTitle>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Coupon Code</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="text" {...register("code")} id="productname" defaultValue="" placeholder="Coupon Code"/>
                                                    <span className="error-message">{errors?.code?.message}</span>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Coupon Name</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="text" {...register("name")} id="productname" defaultValue="" placeholder="Coupon Name"/>
                                                    <span className="error-message">{errors?.name?.message}</span>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Coupon Amount</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="number" {...register("amount")} id="productname" defaultValue="" placeholder="Coupon Amount"/>
                                                    <span className="error-message">{errors?.amount?.message}</span>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Discount Type</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Select defaultValue={getValues().discount_type} setValue={setValue} name={"discount_type"} removeItemButton>
                                                        <option value="">Select an option</option>
                                                        <option value="Amount">Amount</option>
                                                        <option value="Percent">Percent</option>
                                                    </Select>
                                                </div>
                                                <span className="error-message">{errors?.discount_type?.message}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Start Date</Form.Label>
                                                <div className="form-control-wrap">
                                                <Form.Control type="date" {...register("startdate")} id="productname" defaultValue="" placeholder="Start date"/>
                                                </div>
                                                <span className="error-message">{errors?.endate?.message}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">End Date</Form.Label>
                                                <div className="form-control-wrap">
                                                <Form.Control type="date" {...register("endate")} id="productname" defaultValue="" placeholder="Coupon Amount"/>
                                                </div>
                                                <span className="error-message">{errors?.endate?.message}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Status</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Select setValue={setValue} name={"status"} removeItemButton>
                                                        <option value="">Select an option</option>
                                                        <option value="Active">Active</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </Select>
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
                                    <Row className="g-gs">
                                        <Col lg="12">
                                            <OverlineTitle>Usage Restriction</OverlineTitle>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Minimum Spend</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="number" id="productname" defaultValue="" {...register("minimumspend")} placeholder="Enter Minimum Spend"/>
                                                    <span className="error-message">{errors?.minimumspend?.message}</span>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Maximum Spend</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="number" id="productname" defaultValue="" {...register("maximumspend")} placeholder="Enter Maximum Spend"/>
                                                    <span className="error-message">{errors?.maximumspend?.message}</span>
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
                                        <Col lg="12">
                                            <OverlineTitle>Usage Limits</OverlineTitle>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Usage Limit per Coupon</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="number" id="productname" defaultValue="" {...register("usage_limit_per_coupon")} placeholder="Enter Usage Limits"/>
                                                    <span className="error-message">{errors?.usage_limit_per_coupon?.message}</span>
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col lg="6">
                                            <Form.Group className="form-group">
                                                <Form.Label htmlFor="productname">Usage Limit Per User</Form.Label>
                                                <div className="form-control-wrap">
                                                    <Form.Control type="number" id="productname" defaultValue="" {...register("usage_limit_per_user")} placeholder="Enter Usage Limits"/>
                                                    <span className="error-message">{errors?.usage_limit_per_user?.message}</span>
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
                                            <Image src={image ?? "/images/product/a.jpg"}  alt="media" thumbnail/>
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
                                                 setValue("icon",data[0].prefix + data[0].data)
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
                                    <Link to="/coupon/all-coupons" className="btn border-0">Cancel</Link>
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

export default AddCoupon;