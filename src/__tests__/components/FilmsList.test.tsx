import FilmsList from '@/components/features/FilmsList';
import { GET_ALL_FILMS } from '@/graphql/queries';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../helpers/test-utils';

// Mock data for Apollo Client
const filmsMock = {
  request: {
    query: GET_ALL_FILMS,
  },
  result: {
    data: {
      allFilms: {
        films: [
          {
            id: '1',
            title: 'A New Hope',
            episodeID: 4,
            releaseDate: '1977-05-25',
            director: 'George Lucas',
            openingCrawl: 'It is a period of civil war...',
          },
          {
            id: '2',
            title: 'The Empire Strikes Back',
            episodeID: 5,
            releaseDate: '1980-05-17',
            director: 'Irvin Kershner',
            openingCrawl: 'It is a dark time for the Rebellion...',
          },
        ],
      },
    },
  },
};

const loadingMock = {
  request: {
    query: GET_ALL_FILMS,
  },
  result: {
    data: {
      allFilms: {
        films: [],
      },
    },
  },
  delay: 10000, // long delay to simulate loading state
};

const errorMock = {
  request: {
    query: GET_ALL_FILMS,
  },
  error: new Error('Failed to fetch films'),
};

describe('FilmsList component', () => {
  test('should render loading state initially', () => {
    // Arrange & Act
    renderWithProviders(<FilmsList />, {
      mocks: [filmsMock],
    });

    // Assert
    expect(screen.getByText(/Loading films/i)).toBeInTheDocument();
  });

  test('should render films when data is loaded', async () => {
    // Arrange & Act
    renderWithProviders(<FilmsList />, {
      mocks: [filmsMock],
    });

    // Assert - wait for data to load
    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
      expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
      expect(screen.getByText('Episode 4')).toBeInTheDocument();
      expect(screen.getByText('Episode 5')).toBeInTheDocument();
      expect(screen.getByText('George Lucas')).toBeInTheDocument();
      expect(screen.getByText('Irvin Kershner')).toBeInTheDocument();
    });
  });

  test('should show error message when fetch fails', async () => {
    // Arrange & Act
    renderWithProviders(<FilmsList />, {
      mocks: [errorMock],
    });

    // Assert - wait for error
    await waitFor(() => {
      expect(screen.getByText(/Error loading films/i)).toBeInTheDocument();
      expect(screen.getByText(/Try again/i)).toBeInTheDocument();
    });
  });

  test('should refetch data when retry button is clicked', async () => {
    // Arrange
    const user = userEvent.setup();
    renderWithProviders(<FilmsList />, {
      mocks: [errorMock, filmsMock],
    });

    // Act - wait for error state and click retry
    await waitFor(() => {
      expect(screen.getByText(/Error loading films/i)).toBeInTheDocument();
    });
    
    await user.click(screen.getByRole('button', { name: /Try again/i }));

    // Assert - check if loading state shows and then data appears
    expect(screen.getByText(/Loading films/i)).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
    });
  });

  test('should sort films by episode number', async () => {
    // Arrange & Act
    renderWithProviders(<FilmsList />, {
      mocks: [filmsMock],
    });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
    });

    // Get all film elements
    const filmElements = screen.getAllByTestId('film-item');
    
    // Assert that Episode 4 appears before Episode 5
    expect(filmElements[0]).toHaveTextContent('Episode 4');
    expect(filmElements[1]).toHaveTextContent('Episode 5');
  });

  test('should filter films based on search input', async () => {
    // Arrange
    const user = userEvent.setup();
    renderWithProviders(<FilmsList />, {
      mocks: [filmsMock],
    });

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
      expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
    });

    // Act - type in search box
    const searchInput = screen.getByPlaceholderText(/Search films/i);
    await user.type(searchInput, 'Empire');

    // Assert - only Empire film should be visible
    expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
    expect(screen.queryByText('A New Hope')).not.toBeInTheDocument();
  });
});
