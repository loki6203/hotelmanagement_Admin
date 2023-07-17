import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, } from '../../components';
import { allColumns } from '../../store/hotels/AllHotels';
import { useEffect, useState } from 'react';
import { getCookie } from '../../services/cookieHandling';
function ProductPage() {
  const [hotels,setHotels] = useState(null);
  const getAllHotel = async () => {
    const { data, status } = await axios.get("Hotel/list?status=Live"+ (getCookie("role") == "Hotel" ? `&author_id=${getCookie("author_id")}` : ''));
      if (status === 200 || status === 201) {
        setHotels(data?.results)
      }
  }
  useEffect(() => {
      getAllHotel();
  },[])
  return (
    <Layout title="Live Hotels" content="container">
        <Block.Head>
            <Block.HeadBetween>
            <Block.HeadContent>
                    <Block.Title tag="h2">Live Hotels</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                          <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                          <li className="breadcrumb-item">Hotels</li>
                          <li className="breadcrumb-item active" aria-current="page">Live Hotels</li>
                        </ol>
                    </nav>
                </Block.HeadContent>
                <Block.HeadContent>
                  <ul className="d-flex">
                    <li>
                      <Link to="/hotel-manage/add-hotel" className="btn btn-primary btn-md d-md-none">
                        <Icon name="plus"/>
                        <span>Add</span>
                      </Link>
                    </li>
                    {getCookie("role") == "Superadmin" && <li>
                      <Link to="/hotel-manage/add-hotel" className="btn btn-primary d-none d-md-inline-flex">
                        <Icon name="plus"/>
                        <span>Add Hotel</span>
                      </Link>
                    </li>}
                  </ul>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>

      <Block>
        <Card>
        {hotels && <DataTable tableClassName="data-table-head-light table-responsive data-table-checkbox" data={hotels} columns={allColumns} selectableRows ></DataTable>}        </Card>
      </Block>

    </Layout>
  )
}

export default ProductPage;