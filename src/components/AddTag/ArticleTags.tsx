'use client';

import { Tag } from '@/types';
import Link from 'next/link';

type Props = {
  tags: Tag[];
};

export default function ArticleTags({ tags }: Props) {
  if (!tags || tags.length === 0) return <p>No tags</p>;

  return (
    <div className='row'>
      <h4>Tags:</h4>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
        {tags.map((tag) => (
          <li key={tag.id}>
            <Link href={`/browse/tag/${tag.name}`}>
              <span style={{ background: '#eee', padding: '0.3rem 0.6rem', borderRadius: '5px' }}>
                #{tag.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
