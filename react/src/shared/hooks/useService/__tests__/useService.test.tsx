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

import { createTestContainer } from '@/shared/tests/utils/createTestContainer';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ServiceProvider } from '@/App/providers/ServiceProvider/ServiceProvider';
import { useService } from '../useService';

const TEST_SERVICE_IDENTIFIER = Symbol.for('Test.Service');

type GreetingService = {
  message: string;
};

const ServiceConsumer = () => {
  const service = useService<GreetingService>(TEST_SERVICE_IDENTIFIER);

  return <p>{service.message}</p>;
};

describe('useService', () => {
  it('should resolve a service from the provider container', () => {
    const container = createTestContainer([
      {
        serviceIdentifier: TEST_SERVICE_IDENTIFIER,
        value: { message: 'Resolved service' },
      },
    ]);

    render(
      <ServiceProvider container={container}>
        <ServiceConsumer />
      </ServiceProvider>,
    );

    expect(screen.getByText('Resolved service')).toBeInTheDocument();
  });

  it('should throw when used outside the service provider', () => {
    expect(() => render(<ServiceConsumer />)).toThrowError('useService must be used within a ServiceProvider');
  });
});
