import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../services/axios';
import Layout from '../../layout/default';
import Block from '../../components/Block/Block';
import DataTable from '../../components/DataTable/DataTable';
import { Icon, } from '../../components';
import { allColumns } from '../../store/hotels/AllHotels';
import { useEffect, useState } from 'react';

function FeaturedHotels() {
  const [hotels,setHotels] = useState(null);
  const getAllHotel = async () => {
      const { data, status } = await axios.get("Hotel/list");
      if (status === 200 || status === 201) {
        setHotels(data?.results)
      }
  }
  useEffect(() => {
      getAllHotel();
  },[])
  return (
    <Layout title="Featured Hotels" content="container">
        <Block.Head>
            <Block.HeadBetween>
                <Block.HeadContent>
                    <Block.Title tag="h2">Featured Hotels</Block.Title>
                    <nav>
                        <ol className="breadcrumb breadcrumb-arrow mb-0">
                          <li className="breadcrumb-item"><Link to="/home">Home</Link></li>
                          <li className="breadcrumb-item">Featured</li>
                          <li className="breadcrumb-item active" aria-current="page">Featured Hotels</li>
                        </ol>
                    </nav>
                </Block.HeadContent>
            </Block.HeadBetween>
        </Block.Head>

      <Block>
        <Card>
         {hotels && <DataTable tableClassName="data-table-head-light table-responsive data-table-checkbox" data={hotels} columns={allColumns} selectableRows ></DataTable>}
        </Card>
      </Block>

    </Layout>
  )
}

export default FeaturedHotels;