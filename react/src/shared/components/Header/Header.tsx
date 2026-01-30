/*
 * Copyright The Microcks Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { appRoutes } from '@/App/Routing/appRoutes';
import { Svg } from '@pplancq/svg-react';
import { Link } from 'react-router';
import hubMicrocksLogo from '@/assets/images/hub-microcks.svg';

import defaultClasses from './Header.module.css';

export const Header = () => {
  return (
    <header className={defaultClasses.header}>
      <div className={defaultClasses.container}>
        <Link to={appRoutes.home()} tabIndex={0} aria-label="Hub Microcks.io Home" className={defaultClasses.homeLink}>
          <Svg src={hubMicrocksLogo} role="presentation" />
        </Link>

        <Link to={appRoutes.doc({ page: 'contribute' })} className={defaultClasses.docLink}>
          Contribute
        </Link>
      </div>
    </header>
  );
};
