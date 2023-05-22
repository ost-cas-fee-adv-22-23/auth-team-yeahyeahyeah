import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import useSWR from 'swr';
import { fetchDatas } from '@/lib/fetchDatas';

const Navigation: React.FC = () => {
  const { data: status } = useSWR(`/api/systemHealth`, (url) => fetchDatas(url));
  const { data: user } = useSWR(`/api/userInfo`, (url) => fetchDatas(url));
  const { data: session }: any = useSession();
  const systemHealth: boolean = Array.isArray(status);
  const scope = 'urn:zitadel:iam:org:project:roles';

  return (
    <nav className="navbar bg-base-100 flex">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href={'/'}>
          Zitadel
        </Link>
      </div>
      <div className="flex-none">
        {systemHealth === false && <div className="badge badge-secondary mr-8 bg-green-500">Status: ok</div>}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="avatar online rounded-full">
              {session && (
                <div className="avatar online">
                  <div className="w-12 rounded-full relative">
                    <Image alt={'user avatar'} src={'/avatar_default.png'} layout="fill" />
                  </div>
                </div>
              )}
              {!session && (
                <div className="avatar offline">
                  <div className="w-12 rounded-full relative">
                    <Image alt={'user avatar'} src={'/avatar_default.png'} layout="fill" />
                  </div>
                </div>
              )}
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            {session && (
              <li>
                <Link href={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">{user && user[scope] && Object.keys(user[scope]).join(', ')}</span>
                </Link>
              </li>
            )}
            <li>
              {!session && (
                <>
                  <button onClick={() => signIn('zitadel', { callbackUrl: process.env.NEXTAUTH_URL && '/profile' })}>
                    Login
                  </button>
                </>
              )}
              {session && (
                <>
                  <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}>Logout</button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
