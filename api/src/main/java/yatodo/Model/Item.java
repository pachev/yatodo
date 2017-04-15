package yatodo.Model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.validator.constraints.NotEmpty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

/**
 * Created by pachevjoseph on 4/12/17.
 */

@Entity
public class Item {
    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

    @NotEmpty
	@NotNull
	private String title;

	@NotNull
	private String body="";
	private boolean completed;

	@ManyToOne()
	@JoinColumn(name="item_group_id")
	private ItemGroup group;

	@ManyToOne()
    @JoinColumn(name="item_owner_id")
    private TodoUser owner;


    @CreationTimestamp
    private Date createDateTime;

	public Item(){}
	public Item(String title) {
		this.title = title;
	}

	public Item(String title, ItemGroup itemGroup) {
		this.title = title;
		this.group = itemGroup;
	}

	public Item(String title, ItemGroup itemGroup, TodoUser owner) {
		this.title = title;
		this.group = itemGroup;
		this.owner = owner;
	}

	public ItemGroup getGroup() {
		return group;
	}

	public void setGroup(ItemGroup group) {
		this.group = group;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}
    public Date getCreateDateTime() {
        return createDateTime;
    }

    public void setCreateDateTime(Date createDateTime) {
        this.createDateTime = createDateTime;
    }

    public TodoUser getOwner() {
        return owner;
    }

    public void setOwner(TodoUser owner) {
        this.owner = owner;
    }
}
