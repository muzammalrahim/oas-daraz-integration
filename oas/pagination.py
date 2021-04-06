from rest_framework import pagination
from rest_framework.response import Response


DEFAULT_PAGE = 2
DEFAULT_PAGE_SIZE = 100

class CustomPagination(pagination.PageNumberPagination):
    page = DEFAULT_PAGE
    page_size = DEFAULT_PAGE_SIZE
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'count': self.page.paginator.count,
            'page': int(self.request.GET.get('page', DEFAULT_PAGE)), # can not set default = self.page
            'page_size': int(self.request.GET.get('page_size', self.page_size)),
            'results': data
        })

# queryset = self.filter_queryset(self.get_queryset())
# page = self.paginate_queryset(queryset)
# if page is not None:
# 	return None
# 	serializer = self.get_serializer(page, many=True)
# 	result = self.get_paginated_response(serializer.data)
# 	data = result.data
# else:
# 	serializer = self.get_serializer(queryset, many=True)
# 	data = serializer.data