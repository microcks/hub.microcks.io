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

import { HubSection } from '@/shared/components/HubSection';

export const Home = () => {
  return (
    <div>
      {/* hero banner */}
      <section className="relative w-full bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-20 px-6  overflow-hidden">
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to hub.microcks.io</h1>
          <p className="text-lg md:text-xl text-gray-300">
            hub.microcks.io allows API owners to easily distribute their public open API specifications in the form of
            ready-to-use mocks and test suites for Microcks.
          </p>
        </div>

        {/* light blur background effect */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl top-10 left-1/2 -translate-x-1/2" />
        </div>
      </section>
      {/* ************************************** */}

      {/* Hub Section with API cards and filters */}
      <HubSection />
    </div>
  );
};
