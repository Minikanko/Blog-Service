import React from 'react'
import {Row, Col} from 'reactstrap'

const Header = () => {
    return (
        <div id="page-header" className="mb-4">
            <Row>
                <Col md="6" sm="auto" className="text-center m-auto">
                    <h1>Mr.K Blog</h1>
                    <p>Mr.K 사이드 프로젝트 입니다.</p>
                </Col>
            </Row>
        </div>
    )
}

export default Header;