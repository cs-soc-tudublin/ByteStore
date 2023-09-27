<script lang="ts">
    import type { LayoutData } from './$types';
    import { Col, Container, Row} from 'sveltestrap';
    
    export let data: LayoutData;
</script>

<Container fluid>
    <Row>
        <Col>
            <h1 class="title large">ByteStore</h1>
        </Col>
    </Row>
</Container>