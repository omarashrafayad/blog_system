import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllAuthors, createAuthor } from '@/services/authors';

export const useAuthors = () => {
    return useQuery({
        queryKey: ['authors'],
        queryFn: getAllAuthors,
    });
};

export const useCreateAuthor = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAuthor,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authors'] });
        },
    });
};
