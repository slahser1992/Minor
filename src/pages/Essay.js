import { useParams } from 'react-router-dom';

import Marked from '@/components/atoms/Marked';
import test from './test.md';

function Essay() {
	// const { essayId } = useParams();

  return (
    <div>
      <h2>Fabu Monitor</h2>
			<Marked htmlStr={test}/>
    </div>
  );
}

export default Essay;