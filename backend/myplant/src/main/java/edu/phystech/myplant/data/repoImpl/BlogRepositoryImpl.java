package edu.phystech.myplant.data.repoImpl;

import jakarta.persistence.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class BlogRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;

    @SuppressWarnings("unused")
    public List<Long> findPopularBlogs() {
        String hql = "WITH helper AS " +
                "( " +
                "SELECT b.id AS id, COUNT(c.id) AS comments_amount " +
                "FROM blogs AS b JOIN blog_comments AS c ON b.id = c.blog_id " +
                "GROUP BY b.id ORDER BY comments_amount DESC LIMIT 10) " +
                "SELECT blogs.* " +
                "FROM blogs JOIN helper ON blogs.id = helper.id";
        Query query = entityManager.createNativeQuery(hql);

        List<Object[]> result = query.getResultList();
        List<Long> blogs = new ArrayList<>();
        for(Object[] objArr : result)
        {
            blogs.add((Long) objArr[0]);
        }

        return blogs;
    }

}
