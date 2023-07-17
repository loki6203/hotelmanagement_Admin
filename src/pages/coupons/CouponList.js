import { useEffect, useState } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, Select } from '../../components';
import  { couponrColumns } from '../../store/users/CouponData';
import axios from '../../services/axios';
function CouponList() {
    const [coupons, setcoupon] = useState(null);
    const getAllAminitiesList = async () => {
        const { data, status } = await axios.get("Coupon/list");
        if (status === 200 || status === 201) {
            setcoupon(data?.results)
        }
    }
    useEffect(() => {
        getAllAminitiesList();
    }, [])
  return (
    <Layout title="Coupons" content="container">
        <Block.Head>
            <Block.HeadBetween>
                <Block.HeadContent>
                    <Block.Title tag="h2">Coupons List</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                            <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Coupons</li>
                        </ol>
                    </nav>
                </Block.HeadContent>
                <Block.HeadContent>
                    <ul className="d-flex">
                        <li>
                            <Link to="/coupon/add-coupon">
                                <Button className="d-inline-flex" variant="primary">
                                    <Icon name="plus"/>
                                    <span>Add Coupon</span>
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>

      <Block>
        <Card>
          <DataTable tableClassName="data-table-head-light table-responsive" data={coupons ?? []} columns={couponrColumns}/>
        </Card>
      </Block>
    </Layout>
  )
}

export default CouponList;