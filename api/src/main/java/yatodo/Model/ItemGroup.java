package yatodo.Model;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by pachev on 4/13/17.
 */
@Entity
@Table(name = "item_group")
public class ItemGroup {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private Set<Item> items;

    @ManyToOne()
    @JoinColumn(name="group_owner_id")
    private TodoUser owner;

    private String name;

    public ItemGroup(){}

    public ItemGroup(String name) {
        this.name = name;
    }

    public Set<Item> getItems() {
        return items;
    }

    public void setItems(Set<Item> items) {
        this.items = items;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public TodoUser getOwner() {
        return owner;
    }

    public void setOwner(TodoUser owner) {
        this.owner = owner;
    }
}
